import struct
import zlib
import math

def create_png(filename, size, is_maskable=False):
    width = size
    height = size
    
    # We will generate RGBA pixels
    raw_rows = []
    
    cx = width / 2.0
    cy = height / 2.0
    r_max = (width / 2.0) * (0.95 if is_maskable else 0.88)
    
    # Colors (R, G, B, A)
    # Background: #1B4D4E (27, 77, 78)
    # Leaf green: #2D5A27 (45, 90, 39)
    # Light teal: #52B788 (82, 183, 136)
    # Accent amber: #F27D26 (242, 125, 38)
    # Cream: #FDF3E1 (253, 243, 225)
    
    for y in range(height):
        row = bytearray([0]) # PNG filter byte 0 (None)
        for x in range(width):
            dx = x - cx
            dy = y - cy
            dist = math.sqrt(dx*dx + dy*dy)
            
            if is_maskable:
                # Full bleed background
                r, g, b, a = 27, 77, 78, 255
            else:
                # Rounded rect or circle background
                # rounded rect with radius ~ size * 0.22
                corner_radius = size * 0.22
                qx = abs(x - cx) - (cx - corner_radius)
                qy = abs(y - cy) - (cy - corner_radius)
                in_rect = True
                if qx > 0 and qy > 0:
                    in_rect = math.sqrt(qx*qx + qy*qy) <= corner_radius
                elif abs(x - cx) > cx or abs(y - cy) > cy:
                    in_rect = False
                
                if in_rect:
                    r, g, b, a = 27, 77, 78, 255
                else:
                    r, g, b, a = 0, 0, 0, 0

            # Only draw inner icon if within background
            if a > 0:
                scale = 0.7 if is_maskable else 0.85
                ndx = dx / (cx * scale)
                ndy = dy / (cy * scale)
                ndist = math.sqrt(ndx*ndx + ndy*ndy)
                
                # Outer concentric memory ring
                if 0.82 < ndist < 0.86:
                    r, g, b = 209, 232, 226
                elif 0.62 < ndist < 0.65:
                    r, g, b = 209, 232, 226
                
                # Stylized central dual-leaf / lobes
                # Left lobe
                ll_dx = ndx + 0.25
                ll_dy = ndy + 0.05
                if (ll_dx*ll_dx*1.4 + ll_dy*ll_dy*0.7) < 0.22:
                    r, g, b = 82, 183, 136
                
                # Right lobe
                rl_dx = ndx - 0.25
                rl_dy = ndy + 0.05
                if (rl_dx*rl_dx*1.4 + rl_dy*rl_dy*0.7) < 0.22:
                    r, g, b = 45, 90, 39

                # Center stem & warm spark
                if abs(ndx) < 0.04 and abs(ndy) < 0.55:
                    r, g, b = 253, 243, 225
                
                # Memory glowing spark
                c_dx = ndx
                c_dy = ndy + 0.3
                if (c_dx*c_dx + c_dy*c_dy) < 0.02:
                    r, g, b = 242, 125, 38
                
                # Amber accent node 1
                n1_dx = ndx - 0.22
                n1_dy = ndy + 0.15
                if (n1_dx*n1_dx + n1_dy*n1_dy) < 0.008:
                    r, g, b = 242, 125, 38
                
                # Amber accent node 2
                n2_dx = ndx + 0.22
                n2_dy = ndy + 0.15
                if (n2_dx*n2_dx + n2_dy*n2_dy) < 0.008:
                    r, g, b = 242, 125, 38
            
            row.extend([r, g, b, a])
        raw_rows.append(bytes(row))
        
    raw_data = b"".join(raw_rows)
    compressed = zlib.compress(raw_data, 9)
    
    # Build PNG chunks
    def chunk(chunk_type, data):
        c = chunk_type + data
        crc = zlib.crc32(c) & 0xffffffff
        return struct.pack(">I", len(data)) + c + struct.pack(">I", crc)
    
    png = bytearray(b"\x89PNG\r\n\x1a\n")
    # IHDR
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png.extend(chunk(b"IHDR", ihdr_data))
    # IDAT
    png.extend(chunk(b"IDAT", compressed))
    # IEND
    png.extend(chunk(b"IEND", b""))
    
    with open(filename, "wb") as f:
        f.write(png)
    print(f"Generated {filename} ({width}x{height})")

create_png("public/pwa-192x192.png", 192, is_maskable=False)
create_png("public/pwa-512x512.png", 512, is_maskable=False)
create_png("public/pwa-maskable-512x512.png", 512, is_maskable=True)
create_png("public/apple-touch-icon.png", 180, is_maskable=False)
create_png("public/favicon.ico", 48, is_maskable=False)
