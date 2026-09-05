import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Volume2,
  RotateCcw,
  Sparkles,
  HeartHandshake,
  Brain,
  Pill,
  X,
  Globe2,
  Radio,
  CheckCircle2,
  Ban
} from 'lucide-react';
import { LANGUAGES } from '../../data/mockData';
import { LanguageCode } from '../../types';

interface PresetCommands {
  gameCmd: string;
  medicineCmd: string;
  helpCmd: string;
  gameReply: string;
  medicineReply: string;
  helpReply: string;
  generalReply: string;
  speechLang: string;
}

const VOICE_PRESETS: Record<string, PresetCommands> = {
  hi: {
    gameCmd: 'मेमोरी गेम शुरू करें',
    medicineCmd: 'मेरी दवा का समय बताओ',
    helpCmd: 'प्रिया को बुलाओ',
    gameReply: 'आपका स्मृति खेल शुरू हो रहा है। आइए साथ मिलकर अभ्यास करें!',
    medicineReply: 'आपकी सुबह 10:30 बजे की दवा ली जा चुकी है। अगला पानी पीने का समय दोपहर 12:00 बजे है।',
    helpReply: 'देखभालकर्ता प्रिया से तुरंत संपर्क किया जा रहा है। निश्चिंत रहें।',
    generalReply: 'मैं आपकी सहायता के लिए यहाँ उपस्थित हूँ, माँ जी।',
    speechLang: 'hi-IN'
  },
  as: {
    gameCmd: 'স্মৃতি খেল আৰম্ভ কৰক',
    medicineCmd: 'মোৰ ঔষধৰ সময় কওক',
    helpCmd: 'প্ৰিয়াক মাতক',
    gameReply: 'আপোনাৰ স্মৃতিৰ খেল আৰম্ভ হৈছে। আহক একেলগে খেলোঁ!',
    medicineReply: 'আপোনাৰ পুৱা ১০:৩০ বজাৰ ঔষধ লোৱা হ’ল। পৰৱৰ্তী পানী খোৱাৰ সময় দুপৰীয়া ১২:০০ বজাত।',
    helpReply: 'পৰিচৰ্যাকৰ্মী প্ৰিয়াৰ সৈতে সংযোগ কৰা হৈছে।',
    generalReply: 'আই, মই আপোনাৰ সহায়ৰ বাবে আছোঁ।',
    speechLang: 'as-IN'
  },
  bn: {
    gameCmd: 'স্মৃতির খেলা শুরু করুন',
    medicineCmd: 'আমার ওষুধের সময় বলুন',
    helpCmd: 'প্রিয়াকে ডাকুন',
    gameReply: 'আপনার স্মৃতি খেলাটি শুরু করা হচ্ছে। চলুন একসাথে খেলি!',
    medicineReply: 'আপনার সকাল ১০:৩০ মিনিটের ওষুধটি নেওয়া হয়েছে। পরবর্তী জল পানের সময় দুপুর ১২:০০ টায়।',
    helpReply: 'পরিচর্যাকরী প্রিয়ার সাথে যোগাযোগ করা হচ্ছে।',
    generalReply: 'মা, আমি আপনাকে সাহায্য করতে প্রস্তুত।',
    speechLang: 'bn-IN'
  },
  mr: {
    gameCmd: 'मेमरी खेळ सुरू करा',
    medicineCmd: 'औषधाची वेळ सांगा',
    helpCmd: 'प्रियाला बोलवा',
    gameReply: 'तुमचा स्मरण खेळ सुरू होत आहे. चला सोबत सराव करूया!',
    medicineReply: 'तुमचे सकाळचे औषध पूर्ण झाले आहे. पुढची वेळ दुपारी १२:०० वाजता आहे.',
    helpReply: 'काळजीवाहू प्रियाशी संपर्क साधत आहोत.',
    generalReply: 'मी आपल्या मदतीसाठी इथे आहे.',
    speechLang: 'mr-IN'
  },
  ta: {
    gameCmd: 'நினைவக விளையாட்டை தொடங்குங்கள்',
    medicineCmd: 'மருந்து நேரத்தை சரிபார்க்கவும்',
    helpCmd: 'பிரியாவை அழைக்கவும்',
    gameReply: 'உங்கள் நினைவாற்றல் விளையாட்டு தொடங்குகிறது. ஒன்றாக விளையாடுவோம்!',
    medicineReply: 'காலை மருந்து உட்கொள்ளப்பட்டது. அடுத்த நீரேற்ற நேரம் மதியம் 12:00 மணி.',
    helpReply: 'பராமரிப்பாளர் பிரியாவுடன் தொடர்பு கொள்ளப்படுகிறது.',
    generalReply: 'உங்களுக்கு உதவ நான் இங்கே இருக்கிறேன்.',
    speechLang: 'ta-IN'
  },
  te: {
    gameCmd: 'జ్ఞాపకశక్తి ఆట ప్రారంభించండి',
    medicineCmd: 'నా మందుల సమయం చెప్పండి',
    helpCmd: 'ప్రియాను పిలవండి',
    gameReply: 'మీ జ్ఞాపకశక్తి ఆట ప్రారంభమవుతోంది. కలిసి సాధన చేద్దాం!',
    medicineReply: 'ఉదయం 10:30 మందు పూర్తయింది. తదుపరి నీరు తాగే సమయం మధ్యాహ్నం 12:00.',
    helpReply: 'కేర్‌గివర్ ప్రియాతో కనెక్ట్ అవుతోంది.',
    generalReply: 'మీకు సహాయం చేయడానికి నేను సిద్ధంగా ఉన్నాను.',
    speechLang: 'te-IN'
  },
  gu: {
    gameCmd: 'મેમરી રમત શરૂ કરો',
    medicineCmd: 'મારી દવાનો સમય જણાવો',
    helpCmd: 'પ્રિયાને બોલાવો',
    gameReply: 'તમારી સ્મૃતિ રમત શરૂ થઈ રહી છે. ચાલો સાથે રમીએ!',
    medicineReply: 'તમારી સવારની દવા લેવાઈ ગઈ છે. આગળનો સમય બપોરે 12:00 વાગ્યે છે.',
    helpReply: 'સંભાળ રાખનાર પ્રિયા સાથે સંપર્ક થઈ રહ્યો છે.',
    generalReply: 'હું તમારી સહાય માટે અહીં છું.',
    speechLang: 'gu-IN'
  },
  kn: {
    gameCmd: 'ನೆನಪಿನ ಆಟ ಪ್ರಾರಂಭಿಸಿ',
    medicineCmd: 'ನನ್ನ ಔಷಧಿಯ ಸಮಯ ತಿಳಿಸಿ',
    helpCmd: 'ಪ್ರಿಯಾರನ್ನು ಕರೆಯಿರಿ',
    gameReply: 'ನಿಮ್ಮ ಸ್ಮರಣೆ ಆಟ ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ. ಬನ್ನಿ ಒಟ್ಟಿಗೆ ಅಭ್ಯಾಸ ಮಾಡೋಣ!',
    medicineReply: 'ಬೆಳಗಿನ ಔಷಧಿಯನ್ನು ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ. ಮುಂದಿನ ಸಮಯ ಮಧ್ಯಾಹ್ನ 12:00 ಗಂಟೆಗೆ.',
    helpReply: 'ಆರೈಕೆದಾರ ಪ್ರಿಯಾರಿಗೆ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ.',
    generalReply: 'ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ.',
    speechLang: 'kn-IN'
  },
  pa: {
    gameCmd: 'ਯਾਦਦਾਸ਼ਤ ਖੇਡ ਸ਼ੁਰੂ ਕਰੋ',
    medicineCmd: 'ਮੇਰੀ ਦਵਾਈ ਦਾ ਸਮਾਂ ਦੱਸੋ',
    helpCmd: 'ਪ੍ਰਿਆ ਨੂੰ ਬੁਲਾਓ',
    gameReply: 'ਤੁਹਾਡੀ ਯਾਦਦਾਸ਼ਤ ਦੀ ਖੇਡ ਸ਼ੁਰੂ ਹੋ ਰਹੀ ਹੈ। ਆਓ ਮਿਲ ਕੇ ਖੇਡੀਏ!',
    medicineReply: 'ਤੁਹਾਡੀ ਸਵੇਰ ਦੀ ਦਵਾਈ ਲੈ ਲਈ ਗਈ ਹੈ। ਅਗਲਾ ਸਮਾਂ ਦੁਪਹਿਰ 12:00 ਵਜੇ ਹੈ।',
    helpReply: 'ਕੇਅਰਗਿਵਰ ਪ੍ਰਿਆ ਨਾਲ ਸੰਪਰਕ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ।',
    generalReply: 'ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਇੱਥੇ ਹਾਂ।',
    speechLang: 'pa-IN'
  },
  ml: {
    gameCmd: 'ഓർമ്മ കളി ആരംഭിക്കുക',
    medicineCmd: 'മരുന്ന് സമയം പറയുക',
    helpCmd: 'പ്രിയയെ വിളിക്കുക',
    gameReply: 'നിങ്ങളുടെ ഓർമ്മ കളി ആരംഭിക്കുന്നു. നമുക്ക് ഒരുമിച്ച് പരിശീലിക്കാം!',
    medicineReply: 'രാവിലത്തെ മരുന്ന് കഴിച്ചു കഴിഞ്ഞു. അടുത്ത സമയം ഉച്ചയ്ക്ക് 12:00 മണിക്ക്.',
    helpReply: 'പരിചരണക്കാരി പ്രിയയുമായി ബന്ധപ്പെടുന്നു.',
    generalReply: 'നിങ്ങളെ സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്.',
    speechLang: 'ml-IN'
  },
  or: {
    gameCmd: 'ସ୍ମୃତି ଖେଳ ଆରମ୍ଭ କରନ୍ତୁ',
    medicineCmd: 'ମୋର ଔଷଧ ସମୟ କୁହନ୍ତୁ',
    helpCmd: 'ପ୍ରିୟାଙ୍କୁ ଡାକନ୍ତୁ',
    gameReply: 'ଆପଣଙ୍କ ସ୍ମୃତି ଖେଳ ଆରମ୍ଭ ହେଉଛି। ଆସନ୍ତୁ ଏକାଠି ଖେଳିବା!',
    medicineReply: 'ସକାଳ ଔଷଧ ନିଆସରିଛି। ପରବର୍ତ୍ତୀ ସମୟ ମଧ୍ୟାହ୍ନ ୧୨:୦୦ ଟାରେ।',
    helpReply: 'ଯତ୍ନକାରୀ ପ୍ରିୟାଙ୍କ ସହ ସଂଯୋଗ କରାଯାଉଛି।',
    generalReply: 'ମୁଁ ଆପଣଙ୍କ ସାହାଯ୍ୟ ପାଇଁ ଉପସ୍ଥିତ ଅଛି।',
    speechLang: 'or-IN'
  },
  en: {
    gameCmd: 'Start memory game',
    medicineCmd: 'Check my medicine schedule',
    helpCmd: 'I need help from Priya',
    gameReply: 'Opening your Local Memory game now. Let us exercise your memory together!',
    medicineReply: 'Your morning medicine at 10:30 AM was taken. Next hydration break is at 12:00 PM.',
    helpReply: 'Connecting to caregiver Priya right now.',
    generalReply: 'Hello Mataji, I am here to assist you with games, medicines, and daily routines.',
    speechLang: 'en-IN'
  }
};

export const VoiceAssistantModal: React.FC = () => {
  const {
    isVoiceModalOpen,
    setIsVoiceModalOpen,
    accessibility,
    updateAccessibility,
    setRole,
    setPatientView,
    setSelectedGameId,
    setIsHelpModalOpen
  } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [assistantReply, setAssistantReply] = useState<string>('');
  const [isSpeakingResponse, setIsSpeakingResponse] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const actionTimeoutRef = useRef<any>(null);
  const speechTimeoutRef = useRef<any>(null);

  const currentLang = accessibility.language;
  const preset = VOICE_PRESETS[currentLang] || VOICE_PRESETS['hi'] || VOICE_PRESETS['en'];

  // Master cancel and cleanup function
  const handleCancelAndClose = () => {
    // 1. Cancel speech synthesis immediately
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }

    // 2. Abort speech recognition immediately
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    // 3. Clear all scheduled timeouts
    if (actionTimeoutRef.current) {
      clearTimeout(actionTimeoutRef.current);
      actionTimeoutRef.current = null;
    }
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }

    // 4. Reset states
    setIsListening(false);
    setIsSpeakingResponse(false);
    setPendingAction(null);

    // 5. Close modal
    setIsVoiceModalOpen(false);
  };

  // Stop listening without closing modal
  const handleStopListeningOnly = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }
    setIsListening(false);
  };

  // Cancel scheduled navigation
  const handleCancelPendingAction = () => {
    if (actionTimeoutRef.current) {
      clearTimeout(actionTimeoutRef.current);
      actionTimeoutRef.current = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setPendingAction(null);
    setIsSpeakingResponse(false);
  };

  // Escape key listener & modal lifecycle
  useEffect(() => {
    if (!isVoiceModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancelAndClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Initial state reset
    setTranscript('');
    setAssistantReply('');
    setPendingAction(null);
    setIsListening(false);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // ignore
        }
      }
      if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [isVoiceModalOpen]);

  const handleExecuteVoiceCommand = (command: string, actionType: 'game' | 'medicine' | 'help' | 'general') => {
    handleStopListeningOnly();
    setTranscript(command);

    let reply = '';
    let actionLabel = '';
    if (actionType === 'game') {
      reply = preset.gameReply;
      actionLabel = currentLang === 'hi' ? 'स्मृति खेल प्रारंभ किया जा रहा है...' : 'Starting Memory Game...';
    } else if (actionType === 'medicine') {
      reply = preset.medicineReply;
      actionLabel = currentLang === 'hi' ? 'दवा समय सारिणी खोली जा रही है...' : 'Opening Medicine Schedule...';
    } else if (actionType === 'help') {
      reply = preset.helpReply;
      actionLabel = currentLang === 'hi' ? 'प्रिया से संपर्क किया जा रहा है...' : 'Connecting to Priya...';
    } else {
      reply = preset.generalReply;
      actionLabel = '';
    }

    setAssistantReply(reply);
    if (actionType !== 'general') {
      setPendingAction(actionLabel);
    }

    // Speak response if voice assistance is on
    if ('speechSynthesis' in window) {
      setIsSpeakingResponse(true);
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(reply);
      u.lang = preset.speechLang;
      u.rate = 0.92;
      u.onend = () => setIsSpeakingResponse(false);
      u.onerror = () => setIsSpeakingResponse(false);
      window.speechSynthesis.speak(u);
    }

    // Schedule navigation with safety timeout so user can cancel anytime
    if (actionType !== 'general') {
      if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
      actionTimeoutRef.current = setTimeout(() => {
        if (actionType === 'game') {
          setSelectedGameId('local-memory');
          setRole('patient');
          setPatientView('gameplay');
        } else if (actionType === 'medicine') {
          setRole('patient');
          setPatientView('reminders');
        } else if (actionType === 'help') {
          setIsHelpModalOpen(true);
        }
        handleCancelAndClose();
      }, 3200);
    }
  };

  const handleStartListening = () => {
    if (isListening) {
      handleStopListeningOnly();
      return;
    }

    // Cancel any previous speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingResponse(false);
    }
    handleCancelPendingAction();

    setIsListening(true);
    setTranscript('');
    setAssistantReply('');

    // Check browser SpeechRecognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = preset.speechLang;
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          const heard = event.results[0][0].transcript.toLowerCase();
          setTranscript(heard);
          if (event.results[0].isFinal) {
            if (heard.includes('दवा') || heard.includes('medicine') || heard.includes('औषध')) {
              handleExecuteVoiceCommand(heard, 'medicine');
            } else if (heard.includes('मदद') || heard.includes('प्रिया') || heard.includes('help')) {
              handleExecuteVoiceCommand(heard, 'help');
            } else {
              handleExecuteVoiceCommand(heard, 'game');
            }
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch {
        // Fall back to prompt simulation
      }
    }

    // Graceful Simulated Voice Input after 2.8 seconds if Web Speech API is blocked or offline
    speechTimeoutRef.current = setTimeout(() => {
      handleExecuteVoiceCommand(preset.gameCmd, 'game');
    }, 2800);
  };

  const handleRepeat = () => {
    if (assistantReply && 'speechSynthesis' in window) {
      setIsSpeakingResponse(true);
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(assistantReply);
      u.lang = preset.speechLang;
      u.rate = 0.92;
      u.onend = () => setIsSpeakingResponse(false);
      u.onerror = () => setIsSpeakingResponse(false);
      window.speechSynthesis.speak(u);
    }
  };

  if (!isVoiceModalOpen) return null;

  return (
    <div
      id="voice-assistant-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Smriti AI Voice Assistant"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCancelAndClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
    >
      <div
        className="bg-[#FDFBF7] rounded-[28px] sm:rounded-[32px] max-w-lg w-full shadow-2xl border-4 border-[#1B4D4E] text-[#1A1A1A] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Prominent Close / Cancel Button */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#F0F7F4] border-b border-[#D1E8E2] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#1B4D4E] text-amber-300 flex items-center justify-center font-black text-sm shadow-xs shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-base font-black text-[#1B4D4E] leading-tight block">
                {currentLang === 'hi' ? 'स्मृति एआई वॉयस असिस्टेंट' : 'Smriti AI Voice Assistant'}
              </span>
              <span className="text-[11px] text-[#2D5A27] font-semibold">
                {currentLang === 'hi' ? 'बहुभाषी भारतीय वाक् सहायक' : 'Multilingual Indian Speech Engine'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCancelAndClose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-200 text-stone-700 hover:text-stone-900 border border-[#D1E8E2] font-bold text-xs transition-colors cursor-pointer shadow-xs"
            aria-label="Cancel and close voice assistant"
            title="Cancel and close (Escape)"
          >
            <X className="w-4 h-4 text-stone-600" />
            <span>{currentLang === 'hi' ? 'रद्द करें' : 'Cancel'}</span>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4">
          {/* Quick Language Switcher Pills */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-[#1B4D4E]" />
                {currentLang === 'hi' ? 'सहायक भाषा चुनें:' : 'Assistant Language:'}
              </span>
              <span className="text-[10px] font-extrabold text-[#1B4D4E] bg-[#E9F2EF] px-2 py-0.5 rounded-full border border-[#D1E8E2]">
                {LANGUAGES.find((l) => l.code === accessibility.language)?.nativeName || 'हिन्दी'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 p-1 bg-[#F0F7F4] border border-[#D1E8E2] rounded-2xl overflow-x-auto text-xs scrollbar-thin">
              {[
                { code: 'hi', label: 'हिन्दी' },
                { code: 'en', label: 'English' },
                { code: 'bn', label: 'বাংলা' },
                { code: 'mr', label: 'मराठी' },
                { code: 'ta', label: 'தமிழ்' },
                { code: 'te', label: 'తెలుగు' },
                { code: 'gu', label: 'ગુજરાતી' },
                { code: 'kn', label: 'ಕನ್ನಡ' },
                { code: 'pa', label: 'ਪੰਜਾਬੀ' },
                { code: 'ml', label: 'മലയാളം' },
                { code: 'or', label: 'ଓଡ଼ିଆ' },
                { code: 'as', label: 'অসমীয়া' }
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => updateAccessibility({ language: item.code as LanguageCode })}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    accessibility.language === item.code
                      ? 'bg-[#1B4D4E] text-white shadow-xs'
                      : 'bg-white hover:bg-stone-100 text-[#1A1A1A] border border-[#D1E8E2]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pending Action Countdown Banner with Instant Cancel */}
          {pendingAction && (
            <div className="p-3.5 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-center justify-between gap-2 animate-in fade-in shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Radio className="w-4 h-4 text-amber-700 animate-pulse shrink-0" />
                <span>{pendingAction}</span>
              </div>
              <button
                type="button"
                onClick={handleCancelPendingAction}
                className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-extrabold flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
              >
                <Ban className="w-3.5 h-3.5 text-amber-700" />
                <span>{currentLang === 'hi' ? 'रद्द करें' : 'Cancel Action'}</span>
              </button>
            </div>
          )}

          {/* Voice Microphone Center Stage */}
          <div className="flex flex-col items-center justify-center p-6 bg-white border-2 border-[#D1E8E2] rounded-3xl shadow-xs">
            <div className="relative mb-4">
              {isListening && (
                <div className="absolute -inset-3 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
              )}
              {isSpeakingResponse && (
                <div className="absolute -inset-3 rounded-full bg-teal-400/30 animate-pulse pointer-events-none" />
              )}

              <button
                type="button"
                onClick={handleStartListening}
                className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center text-white transition-all transform active:scale-95 shadow-lg cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 ring-4 ring-rose-300'
                    : isSpeakingResponse
                    ? 'bg-teal-600 ring-4 ring-teal-200'
                    : 'bg-[#1B4D4E] hover:bg-[#153a3b] ring-4 ring-[#1B4D4E]/20'
                }`}
                aria-label={isListening ? 'Stop listening' : 'Start speaking'}
              >
                {isListening ? (
                  <MicOff className="w-9 h-9 animate-bounce" />
                ) : isSpeakingResponse ? (
                  <Volume2 className="w-9 h-9 animate-pulse" />
                ) : (
                  <Mic className="w-9 h-9 text-amber-300" />
                )}
              </button>
            </div>

            <p className="text-sm font-extrabold text-[#1B4D4E] text-center">
              {isListening
                ? currentLang === 'hi'
                  ? 'सुन रहा हूँ... अपनी बात कहें'
                  : 'Listening... Please speak now'
                : isSpeakingResponse
                ? currentLang === 'hi'
                  ? 'उत्तर दे रहा हूँ...'
                  : 'Speaking response...'
                : currentLang === 'hi'
                ? 'माइक दबाकर बोलें या नीचे दिए गए आदेश चुनें'
                : 'Tap microphone to speak or click any phrase below'}
            </p>

            {/* Listening Cancel Option */}
            {isListening && (
              <button
                type="button"
                onClick={handleStopListeningOnly}
                className="mt-3 px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5 text-rose-600" />
                <span>{currentLang === 'hi' ? 'सुनना बंद करें' : 'Stop Listening'}</span>
              </button>
            )}

            {/* Live Audio Transcript Display */}
            {transcript && (
              <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-2xl w-full text-center">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-bold block mb-0.5">
                  {currentLang === 'hi' ? 'आपने कहा:' : 'You said:'}
                </span>
                <p className="text-sm font-bold text-stone-900">&ldquo;{transcript}&rdquo;</p>
              </div>
            )}

            {/* Assistant Voice Response Box */}
            {assistantReply && (
              <div className="mt-3 p-3.5 bg-[#E9F2EF] border border-[#D1E8E2] rounded-2xl w-full text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#1B4D4E] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{currentLang === 'hi' ? 'स्मृति सहायक:' : 'SmritiCare Reply:'}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed">
                  &ldquo;{assistantReply}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Quick Command Suggestions (1-Tap triggers) */}
          <div>
            <span className="text-xs font-bold text-stone-600 block mb-2">
              {currentLang === 'hi' ? 'त्वरित वाक् आदेश (क्लिक करें):' : 'Suggested Voice Commands (1-Tap):'}
            </span>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleExecuteVoiceCommand(preset.gameCmd, 'game')}
                className="p-3 bg-white hover:bg-[#F0F7F4] hover:border-[#1B4D4E] border border-[#E5E2D9] rounded-2xl font-bold text-[#1A1A1A] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-7 h-7 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4 text-teal-800" />
                  </div>
                  <span className="truncate">&ldquo;{preset.gameCmd}&rdquo;</span>
                </div>
                <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md font-bold shrink-0">
                  {currentLang === 'hi' ? 'खेल शुरू' : 'Game'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleExecuteVoiceCommand(preset.medicineCmd, 'medicine')}
                className="p-3 bg-white hover:bg-[#F0F7F4] hover:border-[#1B4D4E] border border-[#E5E2D9] rounded-2xl font-bold text-[#1A1A1A] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <Pill className="w-4 h-4 text-amber-800" />
                  </div>
                  <span className="truncate">&ldquo;{preset.medicineCmd}&rdquo;</span>
                </div>
                <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-bold shrink-0">
                  {currentLang === 'hi' ? 'दवा सारिणी' : 'Medicine'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleExecuteVoiceCommand(preset.helpCmd, 'help')}
                className="p-3 bg-white hover:bg-[#F0F7F4] hover:border-[#1B4D4E] border border-[#E5E2D9] rounded-2xl font-bold text-[#1A1A1A] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-7 h-7 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-4 h-4 text-rose-700" />
                  </div>
                  <span className="truncate">&ldquo;{preset.helpCmd}&rdquo;</span>
                </div>
                <span className="text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md font-bold shrink-0">
                  {currentLang === 'hi' ? 'मदद मांगें' : 'Caregiver'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Persistent Bottom Action Bar with High-Visibility Cancel Button */}
        <div className="px-5 py-3.5 bg-[#F0F7F4] border-t border-[#D1E8E2] flex items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCancelAndClose}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 font-bold text-xs sm:text-sm border-2 border-stone-300 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <X className="w-4 h-4 text-stone-500" />
            <span>{currentLang === 'hi' ? 'रद्द करें (Cancel)' : 'Cancel & Close'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRepeat}
              disabled={!assistantReply}
              className="px-3 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-[#1A1A1A] font-bold text-xs sm:text-sm border border-[#D1E8E2] flex items-center gap-1.5 disabled:opacity-40 transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
              <span>{currentLang === 'hi' ? 'दोहराएँ' : 'Repeat'}</span>
            </button>

            <button
              type="button"
              onClick={handleStartListening}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-[#1B4D4E] hover:bg-[#153a3b] text-white'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 text-white" />
                  <span>{currentLang === 'hi' ? 'रोकें' : 'Stop'}</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-amber-300" />
                  <span>{currentLang === 'hi' ? 'बोलें' : 'Speak'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
