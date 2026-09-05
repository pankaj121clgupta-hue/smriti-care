import {
  Patient,
  CognitiveRecord,
  ReminderItem,
  DailyRoutineItem,
  AnomalyAlert,
  GameMetadata,
  LanguageOption,
  LanguageCode
} from '../types';

export const LANGUAGES: LanguageOption[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'National / Northern & Central India' },
  { code: 'en', name: 'English', nativeName: 'English', region: 'National / Pan-India' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'Eastern India (West Bengal, Tripura)' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Western India (Maharashtra)' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Southern India (Tamil Nadu)' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Southern India (Andhra Pradesh, Telangana)' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Southern India (Karnataka)' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Western India (Gujarat)' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'Northern India (Punjab)' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'Southern India (Kerala)' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'Eastern India (Odisha)' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', region: 'North-Eastern India (Assam)' },
  { code: 'mni', name: 'Manipuri', nativeName: 'ꯃꯩꯇꯩꯂꯣꯟ', region: 'North-Eastern India (Manipur)' },
  { code: 'kha', name: 'Khasi', nativeName: 'Ka Ktien Khasi', region: 'North-Eastern India (Meghalaya)' },
  { code: 'lus', name: 'Mizo', nativeName: 'Mizo ṭawng', region: 'North-Eastern India (Mizoram)' },
  { code: 'nag', name: 'Nagamese', nativeName: 'Nagamese Creole', region: 'North-Eastern India (Nagaland)' }
];

export interface TranslationStrings {
  appName: string;
  appTagline: string;
  goodMorning: string;
  todayIs: string;
  friday: string;
  playTitle: string;
  playSubtitle: string;
  start: string;
  todayTitle: string;
  todaySubtitle: string;
  remindersTitle: string;
  remindersSubtitle: string;
  helpButton: string;
  helpModalTitle: string;
  helpModalBody: string;
  callCaregiver: string;
  voiceListening: string;
  voicePrompt: string;
  offlineStatusNotice: string;
  connectedNotice: string;
  repeatInstructions: string;
  exitGame: string;
  wellDone: string;
  letsTryAgain: string;
  tryOneMore: string;
  playAgain: string;
  done: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  en: {
    appName: 'SmritiCare',
    appTagline: 'Cognitive Care & Memory Assistance for India',
    goodMorning: 'Good Morning',
    todayIs: 'Today is Friday',
    friday: 'Friday',
    playTitle: 'PLAY',
    playSubtitle: "Let's exercise your memory",
    start: 'START',
    todayTitle: 'TODAY',
    todaySubtitle: "Today's gentle routine",
    remindersTitle: 'REMINDERS',
    remindersSubtitle: 'Your schedule for today',
    helpButton: 'I need help',
    helpModalTitle: 'Care Assistance',
    helpModalBody: 'Your caregiver and clinical guide are always here with you.',
    callCaregiver: 'Call Caregiver (Priya)',
    voiceListening: "I'm listening...",
    voicePrompt: 'What would you like to do?',
    offlineStatusNotice: 'Offline Mode: Your activities are safely stored on this device.',
    connectedNotice: 'Connected: All activities safely synchronized.',
    repeatInstructions: 'Repeat Instructions',
    exitGame: 'EXIT',
    wellDone: 'Well Done!',
    letsTryAgain: "That's okay. Let's try again gently.",
    tryOneMore: "You remembered so well. Let's try one more?",
    playAgain: 'PLAY AGAIN',
    done: 'DONE'
  },
  as: {
    appName: 'স্মৃতিকেয়াৰ',
    appTagline: 'ভাৰতবৰ্ষৰ জ্যেষ্ঠসকলৰ বাবে স্মৃতি সহায়িকা',
    goodMorning: 'শুভ প্ৰভাত',
    todayIs: 'আজি শুকুৰবাৰ',
    friday: 'শুকুৰবাৰ',
    playTitle: 'খেলক',
    playSubtitle: 'আহক স্মৃতিৰ অলপ অনুশীলন কৰোঁ',
    start: 'আৰম্ভ কৰক',
    todayTitle: 'আজিৰ কাম',
    todaySubtitle: 'আজিৰ সহজ দৈনন্দিন সূচী',
    remindersTitle: 'সোঁৱৰণী',
    remindersSubtitle: 'আজিৰ গুৰুত্বপূৰ্ণ সময়সূচী',
    helpButton: 'মোক সহায় লাগে',
    helpModalTitle: 'সহায়তা কেন্দ্ৰ',
    helpModalBody: 'আপোনাৰ পৰিচৰ্যাকৰ্মী আপোনাৰ লগত আছে। কোনো চিন্তা নকৰিব।',
    callCaregiver: 'প্ৰিয়াক ফোন কৰক (পৰিচৰ্যা)',
    voiceListening: 'মই শুনি আছোঁ...',
    voicePrompt: 'মই আপোনাক কিদৰে সহায় কৰিব পাৰোঁ?',
    offlineStatusNotice: 'অফলাইন ম’ড: আপোনাৰ তথ্যসমূহ এই টেবলেটত সুৰক্ষিত আছে।',
    connectedNotice: 'সংযুক্ত: সকলো তথ্য সুৰক্ষিতভাৱে ক্লাউডত সংৰক্ষণ হৈছে।',
    repeatInstructions: 'পুনৰ কওক',
    exitGame: 'বাহিৰ ওলাওক',
    wellDone: 'বৰ সুন্দৰ হৈছে!',
    letsTryAgain: 'একো কথা নাই। আহক আৰু এবাৰ চেষ্টা কৰোঁ।',
    tryOneMore: 'আপুনি বৰ ভালকৈ মনত ৰাখিছে। আৰু এটা খেলিব নেকি?',
    playAgain: 'আকৌ খেলক',
    done: 'সম্পূৰ্ণ'
  },
  bn: {
    appName: 'স্মৃতিকের',
    appTagline: 'ভারতের প্রবীণদের জ্ঞানীয় ও স্মৃতি সহায়তা',
    goodMorning: 'সুপ্রভাত',
    todayIs: 'আজ শুক্রবার',
    friday: 'শুক্রবার',
    playTitle: 'খেলুন',
    playSubtitle: 'চলুন স্মৃতি একটু সতেজ করে নিই',
    start: 'শুরু করুন',
    todayTitle: 'আজকের রুটিন',
    todaySubtitle: 'সহজ দৈনন্দিন তালিকা',
    remindersTitle: 'রিমাইন্ডার',
    remindersSubtitle: 'আজকের প্রয়োজনীয় অনুস্মারক',
    helpButton: 'সাহায্য চাই',
    helpModalTitle: 'পরিচর্যা সহায়তা',
    helpModalBody: 'আপনার সেবাদানকারী আপনার পাশেই আছেন।',
    callCaregiver: 'প্রিয়াকে কল করুন',
    voiceListening: 'শুনছি...',
    voicePrompt: 'আপনি এখন কি করতে চান?',
    offlineStatusNotice: 'অফলাইন মোড: আপনার সব তথ্য এই ডিভাইসে সুরক্ষিত।',
    connectedNotice: 'সংযুক্ত: সকল তথ্য সফলভাবে সিঙ্ক হয়েছে।',
    repeatInstructions: 'নির্দেশনা আবার শুনুন',
    exitGame: 'বের হন',
    wellDone: 'খুব ভালো হয়েছে!',
    letsTryAgain: 'অসুবিধা নেই। চলুন আরেকবার চেষ্টা করি।',
    tryOneMore: 'খুব সুন্দর মনে রেখেছেন। আরেকবার খেলবেন?',
    playAgain: 'আবার খেলুন',
    done: 'সমাপ্ত'
  },
  mni: {
    appName: 'SmritiCare',
    appTagline: 'ꯑꯍꯜ-ꯂꯃꯟꯁꯤꯡꯒꯤ ꯋꯥꯈꯜ ꯑꯃꯁꯨꯡ ꯅꯤꯡꯁꯤꯡꯕ ꯃꯇꯦꯡ',
    goodMorning: 'ꯏꯃꯥ, ꯐꯕ ꯑꯌꯨꯛ',
    todayIs: 'ꯉꯁꯤ ꯏꯔꯥꯏꯅꯤ',
    friday: 'ꯏꯔꯥꯏꯅꯤ',
    playTitle: 'ꯁꯥꯟꯅꯁꯤ',
    playSubtitle: 'ꯋꯥꯈꯜ ꯆꯦꯠꯁꯤꯜꯍꯟꯁꯤ',
    start: 'ꯍꯧꯔꯁꯤ',
    todayTitle: 'ꯉꯁꯤꯒꯤ',
    todaySubtitle: 'ꯉꯁꯤꯒꯤ ꯊꯕꯛꯁꯤꯡ',
    remindersTitle: 'ꯅꯤꯡꯁꯤꯡꯍꯜꯂꯛꯄ',
    remindersSubtitle: 'ꯉꯁꯤꯒꯤ ꯍꯤꯗꯥꯛ ꯑꯃꯁꯨꯡ ꯃꯇꯝ',
    helpButton: 'ꯃꯇꯦꯡ ꯄꯥꯝꯃꯤ',
    helpModalTitle: 'ꯃꯇꯦꯡ ꯂꯧꯅꯕ',
    helpModalBody: 'ꯅꯍꯥꯛꯄꯨ ꯌꯦꯡꯁꯤꯅꯕ ꯃꯤꯑꯣꯏ ꯂꯩꯔꯤ꯫',
    callCaregiver: 'ꯄ꯭ꯔꯤꯌꯥꯗ ꯐꯣꯟ ꯇꯧꯕꯤꯌꯨ',
    voiceListening: 'ꯇꯥꯔꯤ...',
    voicePrompt: 'ꯀꯔꯤ ꯇꯧꯕ ꯄꯥꯝꯕꯤꯕꯒꯦ?',
    offlineStatusNotice: 'ꯑꯣꯐꯂꯥꯏꯟ: ꯅꯍꯥꯛꯀꯤ ꯄꯨꯝꯅꯃꯛ ꯇꯦꯕ꯭ꯂꯦꯠ ꯑꯁꯤꯗ ꯀꯟꯗꯨꯅ ꯂꯩꯔꯤ꯫',
    connectedNotice: 'ꯀꯅꯦꯛꯇ ꯑꯣꯏꯔꯦ: ꯄꯨꯝꯅꯃꯛ ꯁꯤꯡꯛ ꯇꯧꯔꯦ꯫',
    repeatInstructions: 'ꯑꯃꯨꯛ ꯇꯥꯕꯤꯌꯨ',
    exitGame: 'ꯊꯣꯛꯂꯛꯄ',
    wellDone: 'ꯌꯥꯝꯅ ꯐꯔꯦ!',
    letsTryAgain: 'ꯌꯥꯔꯦ꯫ ꯑꯃꯨꯛ ꯍꯟꯅ ꯍꯣꯠꯅꯁꯤ꯫',
    tryOneMore: 'ꯑꯃꯨꯛ ꯁꯥꯟꯅꯁꯤꯔꯥ?',
    playAgain: 'ꯑꯃꯨꯛ ꯁꯥꯟꯅꯕ',
    done: 'ꯂꯣꯏꯔꯦ'
  },
  kha: {
    appName: 'SmritiCare',
    appTagline: 'Jingiarap ia ka jingkynmaw ha India',
    goodMorning: 'Khublei mynstep, Mei',
    todayIs: 'Myntha ka sngi Thohdieng',
    friday: 'Thohdieng',
    playTitle: 'IALEH',
    playSubtitle: 'Ialehkai ban pynkhlain jingkynmaw',
    start: 'SDANG',
    todayTitle: 'MYNTHA',
    todaySubtitle: 'Ki kam ba man ka sngi',
    remindersTitle: 'JINGKYNMAW',
    remindersSubtitle: 'Ki por ban dih dawai',
    helpButton: 'Nga donkam jingiarap',
    helpModalTitle: 'Jingiarap Caregiver',
    helpModalBody: 'I nongsumar i don ryngkat bad phi.',
    callCaregiver: 'Khyllie ia i Priya',
    voiceListening: 'Nga sngap...',
    voicePrompt: 'Kiei ba phi kwah ban leh?',
    offlineStatusNotice: 'Offline Mode: Ki record jong phi ki la shngain ha kane ka tablet.',
    connectedNotice: 'Connected: La sync lut sha ka cloud.',
    repeatInstructions: 'Pule biang',
    exitGame: 'MIH',
    wellDone: 'Bha shibun!',
    letsTryAgain: 'Ka biang kano kano. Ngi lah ban pyrshang biang.',
    tryOneMore: 'Phi kynmaw bha. Kwah ialeh biang?',
    playAgain: 'IALEH BIANG',
    done: 'DEP'
  },
  lus: {
    appName: 'SmritiCare',
    appTagline: 'Hriatna leh Ngaihtuahna puih tu (India)',
    goodMorning: 'Chibai zing chibai, Ka Pi',
    todayIs: 'Vawiin hi Zirtawpni a ni',
    friday: 'Zirtawpni',
    playTitle: 'KHEL RAWH',
    playSubtitle: 'Hriatrengna tiharh thar ang aw',
    start: 'ṬAN RAWH',
    todayTitle: 'VAWIIN',
    todaySubtitle: 'Vawiin hun duan te',
    remindersTitle: 'HRIATTIRNA',
    remindersSubtitle: 'Damdawi leh inenkawlna hun',
    helpButton: 'Puihna ka mamawh',
    helpModalTitle: 'Inenkawltu Puihna',
    helpModalBody: 'I enkawltu chu i bulah a awm reng e.',
    callCaregiver: 'Priya be rawh',
    voiceListening: 'Ka ngaithla e...',
    voicePrompt: 'Eng nge i tih duh le?',
    offlineStatusNotice: 'Offline Mode: I thiltih te chu he tablet ah hian a him e.',
    connectedNotice: 'Connected: Cloud ah thun luh vek a ni tawh e.',
    repeatInstructions: 'Sawi nawn leh rawh',
    exitGame: 'CHHUAK',
    wellDone: 'I ti ṭha lutuk e!',
    letsTryAgain: 'A pawi lo ve. Zawi tein i ti leh chhin ang aw.',
    tryOneMore: 'I hre thei khawp mai. Vawikhat leh kan khel dawn em ni?',
    playAgain: 'KHEL LEH RAWH',
    done: 'ZO TA'
  },
  nag: {
    appName: 'SmritiCare',
    appTagline: 'Dementia aru Memory Care India nimite',
    goodMorning: 'Good Morning, Mataji',
    todayIs: 'Aji Friday aseh',
    friday: 'Friday',
    playTitle: 'KHELO',
    playSubtitle: 'Memory thura exercise kuribo',
    start: 'START KORIBI',
    todayTitle: 'AJI',
    todaySubtitle: 'Aji laga simple routine',
    remindersTitle: 'REMINDER KHAN',
    remindersSubtitle: 'Dawai aru pani laga time',
    helpButton: 'Moi ke help lageh',
    helpModalTitle: 'Care Assistance',
    helpModalBody: 'Caregiver Priya apuni logot aseh.',
    callCaregiver: 'Caregiver Priya ke call koro',
    voiceListening: 'Moi suni aseh...',
    voicePrompt: 'Apuni ki koribo mon aseh?',
    offlineStatusNotice: 'Offline Mode: Apuni laga activity safe aseh tablet te.',
    connectedNotice: 'Connected: Sob activity sync hoishe.',
    repeatInstructions: 'Aru ekbar koibi',
    exitGame: 'EXIT',
    wellDone: 'Bishi bhal hoishe!',
    letsTryAgain: 'Kotha nai. Aru ekbar koshish koribo.',
    tryOneMore: 'Bhal yaad rakhishe. Aru ekta khelibo?',
    playAgain: 'ARU KHELO',
    done: 'HOIGOL'
  },
  hi: {
    appName: 'स्मृतिकेयर',
    appTagline: 'संपूर्ण भारत के वरिष्ठ नागरिकों हेतु संज्ञानात्मक व स्मृति सहायता',
    goodMorning: 'शुभ प्रभात',
    todayIs: 'आज शुक्रवार है',
    friday: 'शुक्रवार',
    playTitle: 'खेलें',
    playSubtitle: 'आइए अपनी याददाश्त का थोड़ा अभ्यास करें',
    start: 'आरंभ करें',
    todayTitle: 'आज की दिनचर्या',
    todaySubtitle: 'आज की सहज और सरल गतिविधियाँ',
    remindersTitle: 'स्मरण पत्र',
    remindersSubtitle: 'दवाइयाँ और महत्वपूर्ण समय',
    helpButton: 'मुझे सहायता चाहिए',
    helpModalTitle: 'देखभाल सहायता केंद्र',
    helpModalBody: 'आपकी देखभालकर्ता और परिवार हमेशा आपके साथ हैं। चिंता की कोई बात नहीं है।',
    callCaregiver: 'देखभालकर्ता को कॉल करें',
    voiceListening: 'मैं सुन रही हूँ...',
    voicePrompt: 'आप क्या करना चाहेंगे?',
    offlineStatusNotice: 'ऑफ़लाइन मोड: आपकी सभी गतिविधियाँ इस टैबलेट पर सुरक्षित हैं।',
    connectedNotice: 'कनेक्टेड: सारा डेटा क्लाउड पर सुरक्षित रूप से सिंक हो चुका है।',
    repeatInstructions: 'निर्देश दोबारा सुनें',
    exitGame: 'बाहर निकलें',
    wellDone: 'बहुत बढ़िया!',
    letsTryAgain: 'कोई बात नहीं। आइए प्यार से एक बार और कोशिश करते हैं।',
    tryOneMore: 'आपने बहुत अच्छे से याद रखा। क्या एक और खेल खेलें?',
    playAgain: 'दोबारा खेलें',
    done: 'संपन्न'
  },
  mr: {
    appName: 'स्मृतिकेअर',
    appTagline: 'ज्येष्ठ नागरिकांसाठी संज्ञानात्मक आणि स्मरणशक्ती सहाय्य',
    goodMorning: 'शुभ प्रभात',
    todayIs: 'आज शुक्रवार आहे',
    friday: 'शुक्रवार',
    playTitle: 'खेळा',
    playSubtitle: 'चला स्मरणशक्तीचा थोडा सराव करूया',
    start: 'सुरू करा',
    todayTitle: 'आजचे वेळापत्रक',
    todaySubtitle: 'आजच्या सोप्या आणि शांत कृती',
    remindersTitle: 'आठवणी',
    remindersSubtitle: 'औषधे आणि वेळ',
    helpButton: 'मला मदत हवी आहे',
    helpModalTitle: 'काळजीवाहू मदत केंद्र',
    helpModalBody: 'तुमचे काळजीवाहक नेहमी तुमच्यासोबत आहेत. काळजी करू नका.',
    callCaregiver: 'काळजीवाहकाला फोन करा',
    voiceListening: 'मी ऐकत आहे...',
    voicePrompt: 'तुम्हाला काय करायला आवडेल?',
    offlineStatusNotice: 'ऑफलाइन मोड: सर्व माहिती या टॅबलेटवर सुरक्षित आहे.',
    connectedNotice: 'कनेक्ट झाले: सर्व डेटा क्लाउडवर सुरक्षितपणे सिंक झाला आहे.',
    repeatInstructions: 'सूचना पुन्हा ऐका',
    exitGame: 'बाहेर पडा',
    wellDone: 'खूप छान!',
    letsTryAgain: 'काही हरकत नाही. आपण पुन्हा प्रयत्न करूया.',
    tryOneMore: 'तुम्ही खूप छान लक्षात ठेवले. अजून एक खेळ खेळायचा का?',
    playAgain: 'पुन्हा खेळा',
    done: 'पूर्ण'
  },
  ta: {
    appName: 'ஸ்மிருதிகேர்',
    appTagline: 'மூத்த குடிமக்களுக்கான நினைவாற்றல் மற்றும் அறிவாற்றல் உதவி',
    goodMorning: 'காலை வணக்கம்',
    todayIs: 'இன்று வெள்ளிக்கிழமை',
    friday: 'வெள்ளிக்கிழமை',
    playTitle: 'விளையாடு',
    playSubtitle: 'நினைவாற்றலை மெதுவாக பயிற்சி செய்வோம்',
    start: 'தொடங்கு',
    todayTitle: 'இன்றைய வழக்கம்',
    todaySubtitle: 'இன்றைய அமைதியான செயல்பாடுகள்',
    remindersTitle: 'நினைவூட்டல்கள்',
    remindersSubtitle: 'மருந்துகள் மற்றும் முக்கிய நேரம்',
    helpButton: 'எனக்கு உதவி தேவை',
    helpModalTitle: 'பராமரிப்பு உதவி மையம்',
    helpModalBody: 'உங்கள் பராமரிப்பாளர் உங்களுடன் இருக்கிறார். கவலைப்பட வேண்டாம்.',
    callCaregiver: 'பராமரிப்பாளரை அழைக்கவும்',
    voiceListening: 'நான் கேட்கிறேன்...',
    voicePrompt: 'நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?',
    offlineStatusNotice: 'ஆஃப்லைன் பயன்முறை: தரவு பாதுகாப்பாக சேமிக்கப்பட்டுள்ளது.',
    connectedNotice: 'இணைக்கப்பட்டது: அனைத்து தகவல்களும் ஒத்திசைக்கப்பட்டன.',
    repeatInstructions: 'விளக்கங்களை மீண்டும் கேட்கவும்',
    exitGame: 'வெளியேறு',
    wellDone: 'மிக நன்று!',
    letsTryAgain: 'பரவாயில்லை, மீண்டும் ஒரு முறை முயற்சி செய்வோம்.',
    tryOneMore: 'நன்றாக நினைவில் வைத்திருக்கிறீர்கள். இன்னொரு விளையாட்டு விளையாடலாமா?',
    playAgain: 'மீண்டும் விளையாடு',
    done: 'முடிந்தது'
  },
  te: {
    appName: 'స్మృతికేర్',
    appTagline: 'భారతదేశంలోని వృద్ధులకు జ్ఞాపకశక్తి మరియు సంరక్షణ సహాయం',
    goodMorning: 'శుభోదయం',
    todayIs: 'ఈరోజు శుక్రవారం',
    friday: 'శుక్రవారం',
    playTitle: 'ఆడండి',
    playSubtitle: 'జ్ఞాపకశక్తిని సరదాగా అభ్యాసం చేద్దాం',
    start: 'ప్రారంభించు',
    todayTitle: 'నేటి దినచర్య',
    todaySubtitle: 'నేటి ప్రశాంతమైన పనులు',
    remindersTitle: 'గుర్తుంచుకునేవి',
    remindersSubtitle: 'మందులు మరియు సమయం',
    helpButton: 'నాకు సహాయం కావాలి',
    helpModalTitle: 'సంరక్షణ సహాయ కేంద్రం',
    helpModalBody: 'మీ సంరక్షకులు మీతోనే ఉన్నారు. ఎటువంటి ఆందోళన వద్దు.',
    callCaregiver: 'సంరక్షకుడికి కాల్ చేయండి',
    voiceListening: 'నేను వింటున్నాను...',
    voicePrompt: 'మీరు ఏమి చేయాలనుకుంటున్నారు?',
    offlineStatusNotice: 'ఆఫ్‌లైన్ మోడ్: మీ సమాచారం పరికరంలో భద్రంగా ఉంది.',
    connectedNotice: 'కనెక్ట్ అయింది: మొత్తం డేటా సింక్ చేయబడింది.',
    repeatInstructions: 'సూచనలు మళ్లీ వినండి',
    exitGame: 'నిష్క్రమించు',
    wellDone: 'చాలా బాగుంది!',
    letsTryAgain: 'పర్వాలేదు. మళ్లీ నెమ్మదిగా ప్రయత్నిద్దాం.',
    tryOneMore: 'చాలా బాగా గుర్తుపెట్టుకున్నారు. ఇంకో ఆట ఆడుదామా?',
    playAgain: 'మళ్లీ ఆడండి',
    done: 'పూర్తయింది'
  },
  kn: {
    appName: 'ಸ್ಮೃತಿಕೇರ್',
    appTagline: 'ಹಿರಿಯ ನಾಗರಿಕರಿಗಾಗಿ ಅರಿವಿನ ಹಾಗೂ ನೆನಪಿನ ಶಕ್ತಿ ನೆರವು',
    goodMorning: 'ಶುಭೋದಯ',
    todayIs: 'ಇಂದು ಶುಕ್ರವಾರ',
    friday: 'ಶುಕ್ರವಾರ',
    playTitle: 'ಆಟವಾಡಿ',
    playSubtitle: 'ನೆನಪಿನ ಶಕ್ತಿಯನ್ನು ನಿಧಾನವಾಗಿ ಅಭ್ಯಾಸ ಮಾಡೋಣ',
    start: 'ಪ್ರಾರಂಭಿಸಿ',
    todayTitle: 'ಇಂದಿನ ದಿನಚರಿ',
    todaySubtitle: 'ಇಂದಿನ ಸರಳ ಮತ್ತು ಶಾಂತ ಚಟುವಟಿಕೆಗಳು',
    remindersTitle: 'ಜ್ಞಾಪನೆಗಳು',
    remindersSubtitle: 'ಔಷಧಿಗಳು ಮತ್ತು ಸಮಯ',
    helpButton: 'ನನಗೆ ಸಹಾಯ ಬೇಕು',
    helpModalTitle: 'ಆರೈಕೆ ನೆರವು ಕೇಂದ್ರ',
    helpModalBody: 'ನಿಮ್ಮ ಆರೈಕೆದಾರರು ನಿಮ್ಮ ಜೊತೆಗಿದ್ದಾರೆ. ಚಿಂತಿಸಬೇಡಿ.',
    callCaregiver: 'ಆರೈಕೆದಾರರಿಗೆ ಕರೆ ಮಾಡಿ',
    voiceListening: 'ನಾನು ಕೇಳುತ್ತಿದ್ದೇನೆ...',
    voicePrompt: 'ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?',
    offlineStatusNotice: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್: ಡೇಟಾ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹವಾಗಿದೆ.',
    connectedNotice: 'ಸಂಪರ್ಕಗೊಂಡಿದೆ: ಎಲ್ಲಾ ವಿವರಗಳು ಕ್ಲೌಡ್‌ನಲ್ಲಿ ಸಿಂಕ್ ಆಗಿವೆ.',
    repeatInstructions: 'ಸೂಚನೆಗಳನ್ನು ಪುನಃ ಕೇಳಿ',
    exitGame: 'ಹೊರಹೋಗಿ',
    wellDone: 'ತುಂಬಾ ಒಳ್ಳೆಯದು!',
    letsTryAgain: 'ಪರವಾಗಿಲ್ಲ, ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸೋಣ.',
    tryOneMore: 'ಚೆನ್ನಾಗಿ ನೆನಪಿಟ್ಟುಕೊಂಡಿದ್ದೀರಿ. ಇನ್ನೊಂದು ಆಟ ಆಡೋಣವೇ?',
    playAgain: 'ಮತ್ತೆ ಆಟವಾಡಿ',
    done: 'ಮುಗಿಯಿತು'
  },
  gu: {
    appName: 'સ્મૃતિકેર',
    appTagline: 'વરિષ્ઠ નાગરિકો માટે સ્મૃતિ અને સંજ્ઞાનાત્મક સહાય',
    goodMorning: 'સુપ્રભાત',
    todayIs: 'આજે શુક્રવાર છે',
    friday: 'શુક્રવાર',
    playTitle: 'રમો',
    playSubtitle: 'ચાલો સ્મૃતિનો થોડો અભ્યાસ કરીએ',
    start: 'શરૂ કરો',
    todayTitle: 'આજની દિનચર્યા',
    todaySubtitle: 'આજની શાંત અને સરળ પ્રવૃત્તિઓ',
    remindersTitle: 'યાદી',
    remindersSubtitle: 'દવાઓ અને સમય',
    helpButton: 'મને મદદ જોઈએ છે',
    helpModalTitle: 'સંભાળ સહાય કેન્દ્ર',
    helpModalBody: 'તમારા સંભાળ રાખનાર તમારી સાથે છે. ચિંતા કરશો નહીં.',
    callCaregiver: 'સંભાળ રાખનારને કૉલ કરો',
    voiceListening: 'હું સાંભળી રહ્યો છું...',
    voicePrompt: 'તમે શું કરવા માંગો છો?',
    offlineStatusNotice: 'ઑફલાઇન મોડ: તમામ માહિતી સુરક્ષિત રીતે સંગ્રહિત છે.',
    connectedNotice: 'કનેક્ટેડ: તમામ વિગતો ક્લાઉડ પર સિંક થઈ ગઈ છે.',
    repeatInstructions: 'સૂચનાઓ ફરી સાંભળો',
    exitGame: 'બહાર નીકળો',
    wellDone: 'ખૂબ સરસ!',
    letsTryAgain: 'વાંધો નહીં. ચાલો ફરીથી પ્રયત્ન કરીએ.',
    tryOneMore: 'તમે સરસ યાદ રાખ્યું. શું હજી એક રમત રમવી છે?',
    playAgain: 'ફરી રમો',
    done: 'સંપન્ન'
  },
  pa: {
    appName: 'ਸਮ੍ਰਿਤੀਕੇਅਰ',
    appTagline: 'ਬਜ਼ੁਰਗਾਂ ਲਈ ਯਾਦਾਸ਼ਤ ਅਤੇ ਦੇਖਭਾਲ ਸਹਾਇਤਾ',
    goodMorning: 'ਸ਼ੁਭ ਸਵੇਰ',
    todayIs: 'ਅੱਜ ਸ਼ੁੱਕਰਵਾਰ ਹੈ',
    friday: 'ਸ਼ੁੱਕਰਵਾਰ',
    playTitle: 'ਖੇਡੋ',
    playSubtitle: 'ਆਓ ਯਾਦਾਸ਼ਤ ਦਾ ਅਭਿਆਸ ਕਰੀਏ',
    start: 'ਸ਼ੁਰੂ ਕਰੋ',
    todayTitle: 'ਅੱਜ ਦੀ ਰੁਟੀਨ',
    todaySubtitle: 'ਅੱਜ ਦੀਆਂ ਸ਼ਾਂਤ ਗਤੀਵਿਧੀਆਂ',
    remindersTitle: 'ਯਾਦ-ਦਹਾਨੀ',
    remindersSubtitle: 'ਦਵਾਈਆਂ ਅਤੇ ਸਮਾਂ',
    helpButton: 'ਮੈਨੂੰ ਮਦਦ ਚਾਹੀਦੀ ਹੈ',
    helpModalTitle: 'ਦੇਖਭਾਲ ਕੇਂਦਰ',
    helpModalBody: 'ਤੁਹਾਡਾ ਦੇਖਭਾਲਕਰਤਾ ਤੁਹਾਡੇ ਨਾਲ ਹੈ। ਚਿੰਤਾ ਨਾ ਕਰੋ।',
    callCaregiver: 'ਦੇਖਭਾਲਕਰਤਾ ਨੂੰ ਕਾਲ ਕਰੋ',
    voiceListening: 'ਮੈਂ ਸੁਣ ਰਿਹਾ ਹਾਂ...',
    voicePrompt: 'ਤੁਸੀਂ ਕੀ ਕਰਨਾ ਚਾਹੋਗੇ?',
    offlineStatusNotice: 'ਆਫਲਾਈਨ ਮੋਡ: ਤੁਹਾਡਾ ਡਾਟਾ ਸੁਰੱਖਿਅਤ ਹੈ।',
    connectedNotice: 'ਕਨੈਕਟ ਹੋ ਗਿਆ: ਸਾਰਾ ਡਾਟਾ ਸਿੰਕ ਹੋ ਚੁੱਕਾ ਹੈ।',
    repeatInstructions: 'ਹਿਦਾਇਤਾਂ ਦੁਬਾਰਾ ਸੁਣੋ',
    exitGame: 'ਬਾਹਰ ਜਾਓ',
    wellDone: 'ਬਹੁਤ ਵਧੀਆ!',
    letsTryAgain: 'ਕੋਈ ਗੱਲ ਨਹੀਂ। ਆਓ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਹਾਂ।',
    tryOneMore: 'ਤੁਸੀਂ ਬਹੁਤ ਵਧੀਆ ਯਾਦ ਰੱਖਿਆ। ਇੱਕ ਹੋਰ ਖੇਡ ਖੇਡੀਏ?',
    playAgain: 'ਦੁਬਾਰਾ ਖੇਡੋ',
    done: 'ਮੁਕੰਮਲ'
  },
  ml: {
    appName: 'സ്മൃതി കെയർ',
    appTagline: 'മുതിർന്നവർക്കായുള്ള ഓർമ്മശക്തി സംരക്ഷണ സഹായം',
    goodMorning: 'സുപ്രഭാതം',
    todayIs: 'ഇന്ന് വെള്ളിയാഴ്ച',
    friday: 'വെള്ളിയാഴ്ച',
    playTitle: 'കളിക്കുക',
    playSubtitle: 'ഓർമ്മശക്തി ശാന്തമായി പരിശീലിക്കാം',
    start: 'ആരംഭിക്കുക',
    todayTitle: 'ഇന്നത്തെ ദിനചര്യ',
    todaySubtitle: 'ഇന്നത്തെ ലളിതമായ പ്രവർത്തനങ്ങൾ',
    remindersTitle: 'ഓർമ്മപ്പെടുത്തലുകൾ',
    remindersSubtitle: 'മരുന്നുകളും സമയവും',
    helpButton: 'സഹായം വേണം',
    helpModalTitle: 'പരിചരണ സഹായം',
    helpModalBody: 'നിങ്ങളുടെ പരിചാരകർ ഒപ്പമുണ്ട്. വിഷമിക്കേണ്ടതില്ല.',
    callCaregiver: 'പരിചാരകനെ വിളിക്കുക',
    voiceListening: 'ഞാൻ കേൾക്കുന്നു...',
    voicePrompt: 'നിങ്ങൾക്ക് എന്താണ് ചെയ്യേണ്ടത്?',
    offlineStatusNotice: 'ഓഫ്‌ലൈൻ മോഡ്: വിവരങ്ങൾ സുരക്ഷിതമായി സൂക്ഷിച്ചിരിക്കുന്നു.',
    connectedNotice: 'കണക്റ്റ് ചെയ്തു: വിവരങ്ങൾ സമന്വയിപ്പിച്ചു.',
    repeatInstructions: 'നിർദ്ദേശങ്ങൾ വീണ്ടും കേൾക്കുക',
    exitGame: 'പുറത്തുകടക്കുക',
    wellDone: 'വളരെ നന്നായി!',
    letsTryAgain: 'കുഴപ്പമില്ല. നമുക്ക് വീണ്ടും ശ്രമിക്കാം.',
    tryOneMore: 'നന്നായി ഓർത്തു. ഒരു കളി കൂടി കളിച്ചാലോ?',
    playAgain: 'വീണ്ടും കളിക്കുക',
    done: 'പൂർത്തിയായി'
  },
  or: {
    appName: 'ସ୍ମୃତିକେୟାର',
    appTagline: 'ବରିଷ୍ଠ ନାଗରିକଙ୍କ ପାଇଁ ସ୍ମୃତି ଓ ଯତ୍ନ ସହାୟତା',
    goodMorning: 'ଶୁଭ ସକାଳ',
    todayIs: 'ଆଜି ଶୁକ୍ରବାର',
    friday: 'ଶୁକ୍ରବାର',
    playTitle: 'ଖେଳନ୍ତୁ',
    playSubtitle: 'ଆସନ୍ତୁ ସ୍ମୃତିଶକ୍ତିର ଅଭ୍ୟାସ କରିବା',
    start: 'ଆରମ୍ଭ କରନ୍ତୁ',
    todayTitle: 'ଆଜିର କାର୍ଯ୍ୟସୂଚୀ',
    todaySubtitle: 'ଆଜିର ସହଜ ଓ ଶାନ୍ତ କାର୍ଯ୍ୟକଳାପ',
    remindersTitle: 'ସ୍ମାରକପତ୍ର',
    remindersSubtitle: 'ଔଷଧ ଏବଂ ସମୟ',
    helpButton: 'ମୋତେ ସାହାଯ୍ୟ ଦରକାର',
    helpModalTitle: 'ଯତ୍ନ ସହାୟତା କେନ୍ଦ୍ର',
    helpModalBody: 'ଆପଣଙ୍କ ଯତ୍ନକାରୀ ସାଙ୍ଗରେ ଅଛନ୍ତି। ଚିନ୍ତା କରନ୍ତୁ ନାହିଁ।',
    callCaregiver: 'ଯତ୍ନକାରୀଙ୍କୁ ଫୋନ୍ କରନ୍ତୁ',
    voiceListening: 'ମୁଁ ଶୁଣୁଛି...',
    voicePrompt: 'ଆପଣ କଣ କରିବାକୁ ଚାହାଁନ୍ତି?',
    offlineStatusNotice: 'ଅଫଲାଇନ୍ ମୋଡ୍: ତଥ୍ୟ ସୁରକ୍ଷିତ ରହିଛି।',
    connectedNotice: 'କନେକ୍ଟ ହୋଇଛି: ସମସ୍ତ ତଥ୍ୟ ସିଙ୍କ୍ ହୋଇଛି।',
    repeatInstructions: 'ନିର୍ଦ୍ଦେଶ ପୁନର୍ବାର ଶୁଣନ୍ତୁ',
    exitGame: 'ପ୍ରସ୍ଥାନ କରନ୍ତୁ',
    wellDone: 'ବହୁତ ବଢ଼ିଆ!',
    letsTryAgain: 'କିଛି କଥା ନାହିଁ, ଆସନ୍ତୁ ଆଉଥରେ ଚେଷ୍ଟା କରିବା।',
    tryOneMore: 'ଆପଣ ଭଲ ଭାବରେ ମନେ ରଖିଛନ୍ତି। ଆଉ ଗୋଟିଏ ଖେଳ ଖେଳିବା କି?',
    playAgain: 'ପୁନର୍ବାର ଖେଳନ୍ତୁ',
    done: 'ସମ୍ପନ୍ନ'
  }
};

export const INITIAL_PATIENT: Patient = {
  id: 'IND-000124',
  name: 'Kanta Devi Sharma',
  relationshipName: 'Mataji',
  age: 72,
  gender: 'Female',
  language: 'hi',
  district: 'Varanasi',
  state: 'Uttar Pradesh',
  status: 'Stable',
  primaryCaregiver: 'Priya Sharma (Daughter-in-law)',
  caregiverPhone: '+91 98640 12345',
  lastActivityTime: '12 minutes ago',
  todayCompletedCount: 4,
  todayTotalCount: 5,
  adherenceRate: 92,
  memoryScore: 82,
  attentionScore: 78,
  spatialScore: 84,
  reactionTime: 1.7,
  baselineScore: 79,
  currentPerformance: 82,
  notes: 'Very fond of morning bhajans, courtyard gardening, and traditional Indian folk stories. Responds enthusiastically to cultural memory and Diya/Lotus symbol exercises.'
};

export const MOCK_PATIENTS: Patient[] = [
  INITIAL_PATIENT,
  {
    id: 'IND-000125',
    name: 'Rameshwar Patil',
    relationshipName: 'Ajoba',
    age: 76,
    gender: 'Male',
    language: 'mr',
    district: 'Pune',
    state: 'Maharashtra',
    status: 'Stable',
    primaryCaregiver: 'Sachin Patil (Son)',
    caregiverPhone: '+91 94220 56789',
    lastActivityTime: '45 minutes ago',
    todayCompletedCount: 3,
    todayTotalCount: 4,
    adherenceRate: 88,
    memoryScore: 75,
    attentionScore: 73,
    spatialScore: 79,
    reactionTime: 2.1,
    baselineScore: 74,
    currentPerformance: 75,
    notes: 'Enjoys Marathi Abhang tunes and heritage courtyard navigation games.'
  },
  {
    id: 'IND-000126',
    name: 'Meenakshi Sundaram',
    relationshipName: 'Paati',
    age: 70,
    gender: 'Female',
    language: 'ta',
    district: 'Madurai',
    state: 'Tamil Nadu',
    status: 'Watch',
    primaryCaregiver: 'Karthik Sundaram (Son)',
    caregiverPhone: '+91 98401 44321',
    lastActivityTime: '3 hours ago',
    todayCompletedCount: 2,
    todayTotalCount: 5,
    adherenceRate: 64,
    memoryScore: 68,
    attentionScore: 65,
    spatialScore: 70,
    reactionTime: 2.4,
    baselineScore: 75,
    currentPerformance: 68,
    notes: 'Fond of Carnatic classical melodies and Kolam temple floor pattern recognition.'
  },
  {
    id: 'IND-000127',
    name: 'Subhash Mukherjee',
    relationshipName: 'Dadu',
    age: 74,
    gender: 'Male',
    language: 'bn',
    district: 'Kolkata',
    state: 'West Bengal',
    status: 'Stable',
    primaryCaregiver: 'Ananya Mukherjee (Daughter)',
    caregiverPhone: '+91 98300 99887',
    lastActivityTime: '1 hour ago',
    todayCompletedCount: 4,
    todayTotalCount: 4,
    adherenceRate: 95,
    memoryScore: 86,
    attentionScore: 81,
    spatialScore: 85,
    reactionTime: 1.6,
    baselineScore: 82,
    currentPerformance: 86,
    notes: 'Enjoys Rabindra Sangeet, literary recall, and terracotta architectural symbols.'
  },
  {
    id: 'IND-000128',
    name: 'Aai Sharma',
    relationshipName: 'Aai',
    age: 72,
    gender: 'Female',
    language: 'as',
    district: 'Kamrup Metro (Guwahati)',
    state: 'Assam',
    status: 'Stable',
    primaryCaregiver: 'Priya Sharma (Daughter-in-law)',
    caregiverPhone: '+91 98640 12345',
    lastActivityTime: '2 hours ago',
    todayCompletedCount: 4,
    todayTotalCount: 5,
    adherenceRate: 91,
    memoryScore: 81,
    attentionScore: 78,
    spatialScore: 82,
    reactionTime: 1.8,
    baselineScore: 80,
    currentPerformance: 81,
    notes: 'Very fond of morning tea garden stories, Bihu rhythms, and woven Jaapi crafts.'
  },
  {
    id: 'IND-000129',
    name: 'Gurpreet Singh',
    relationshipName: 'Dadaji',
    age: 75,
    gender: 'Male',
    language: 'pa',
    district: 'Amritsar',
    state: 'Punjab',
    status: 'Stable',
    primaryCaregiver: 'Harpreet Singh (Son)',
    caregiverPhone: '+91 98140 11223',
    lastActivityTime: '25 minutes ago',
    todayCompletedCount: 4,
    todayTotalCount: 4,
    adherenceRate: 96,
    memoryScore: 84,
    attentionScore: 80,
    spatialScore: 81,
    reactionTime: 1.8,
    baselineScore: 81,
    currentPerformance: 84,
    notes: 'Active morning walker. Memory recall scores consistently stable.'
  },
  {
    id: 'IND-000130',
    name: 'Hansa Ben Patel',
    relationshipName: 'Baa',
    age: 71,
    gender: 'Female',
    language: 'gu',
    district: 'Ahmedabad',
    state: 'Gujarat',
    status: 'Review',
    primaryCaregiver: 'Jignesh Patel (Son)',
    caregiverPhone: '+91 98250 88776',
    lastActivityTime: 'Yesterday, 19:10',
    todayCompletedCount: 1,
    todayTotalCount: 5,
    adherenceRate: 54,
    memoryScore: 61,
    attentionScore: 59,
    spatialScore: 62,
    reactionTime: 2.8,
    baselineScore: 73,
    currentPerformance: 61,
    notes: 'Missed afternoon hydration reminder. Follow-up suggested.'
  },
  {
    id: 'IND-000131',
    name: 'Venkata Rama Rao',
    relationshipName: 'Thathayya',
    age: 73,
    gender: 'Male',
    language: 'te',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    status: 'Stable',
    primaryCaregiver: 'Srinivas Rao (Son)',
    caregiverPhone: '+91 94400 33445',
    lastActivityTime: '30 minutes ago',
    todayCompletedCount: 4,
    todayTotalCount: 5,
    adherenceRate: 90,
    memoryScore: 80,
    attentionScore: 77,
    spatialScore: 83,
    reactionTime: 1.9,
    baselineScore: 79,
    currentPerformance: 80,
    notes: 'Enjoys classical Carnatic rhythm tapping and seaside heritage path exercises.'
  }
];

// Generate 30 days of realistic cognitive trends for Aai Sharma
export const GENERATE_30_DAY_RECORDS = (): CognitiveRecord[] => {
  const records: CognitiveRecord[] = [];
  const baseDate = new Date();
  
  // Baseline averages: memory ~81, attention ~77, spatial ~83, reaction ~1.7s
  for (let i = 29; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - i);
    
    // Smooth sinusoidal wave with minor natural fluctuation
    const cycle = Math.sin(i * 0.25) * 2.5;
    const microVariation = ((i * 13) % 5) - 2;
    
    const memory = Math.round(80 + cycle + microVariation);
    const attention = Math.round(76 + cycle * 0.8 + (microVariation * 0.7));
    const spatial = Math.round(83 + cycle * 0.6 + (microVariation * 0.5));
    const reaction = Number((1.75 - (cycle * 0.04) + (microVariation * 0.03)).toFixed(2));
    const routine = Math.min(100, Math.max(75, Math.round(90 + cycle * 1.5 + microVariation)));
    const completion = Math.min(100, Math.max(80, Math.round(92 + cycle)));
    const composite = Math.round((memory * 0.4) + (attention * 0.3) + (spatial * 0.3));

    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    records.push({
      date: d.toISOString().split('T')[0],
      dayLabel: i < 7 ? dayName : monthDay,
      memoryScore: memory,
      attentionScore: attention,
      spatialScore: spatial,
      reactionTime: reaction,
      routineAdherence: routine,
      gameCompletion: completion,
      compositeScore: composite
    });
  }

  return records;
};

export const INITIAL_ROUTINE: DailyRoutineItem[] = [
  {
    id: 'r1',
    timeOfDay: 'morning',
    title: 'Morning Sunshine & Pranayama',
    subtitle: '7:30 AM • Completed with Priya',
    completed: true,
    type: 'routine'
  },
  {
    id: 'r2',
    timeOfDay: 'morning',
    title: 'Warm Herbal Tea & Breakfast',
    subtitle: '8:30 AM • Masala Chai & Poha / Idli',
    completed: true,
    type: 'meal'
  },
  {
    id: 'r3',
    timeOfDay: 'morning',
    title: 'Morning Medicine (Blood Pressure)',
    subtitle: '10:30 AM • Taken after breakfast',
    completed: true,
    type: 'medicine'
  },
  {
    id: 'r4',
    timeOfDay: 'afternoon',
    title: 'Hydration Break (Warm Water)',
    subtitle: '12:00 PM • 1 Glass of water',
    completed: true,
    type: 'water'
  },
  {
    id: 'r5',
    timeOfDay: 'afternoon',
    title: 'Afternoon Memory Exercise',
    subtitle: '3:00 PM • Cultural Memory Game',
    completed: false,
    type: 'game'
  }
];

export const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-1',
    type: 'medicine',
    title: 'Morning Medicine (BP & Vitamin)',
    time: '10:30 AM',
    completed: true,
    repeat: 'Daily',
    voiceMessage: 'Mataji, it is time for your morning blood pressure medicine.',
    language: 'hi'
  },
  {
    id: 'rem-2',
    type: 'hydration',
    title: 'Drink 1 Glass of Warm Water',
    time: '12:00 PM',
    completed: true,
    repeat: 'Every 2 Hours',
    voiceMessage: 'Mataji, please drink a cup of warm water now.',
    language: 'hi'
  },
  {
    id: 'rem-3',
    type: 'game',
    title: 'Play Afternoon Memory Game',
    time: '3:00 PM',
    completed: false,
    repeat: 'Daily',
    voiceMessage: 'Time for our pleasant 5-minute cultural memory game.',
    language: 'hi'
  },
  {
    id: 'rem-4',
    type: 'exercise',
    title: 'Garden Stroll / Courtyard Walking',
    time: '4:30 PM',
    completed: false,
    repeat: 'Daily',
    voiceMessage: 'Gentle walk in the courtyard or park with walking stick.',
    language: 'hi'
  },
  {
    id: 'rem-5',
    type: 'doctor',
    title: 'Community Health Worker Checkup',
    time: 'Tomorrow, 11:00 AM',
    completed: false,
    repeat: 'Once',
    voiceMessage: 'Sister Sunita from the Health Wellness Centre will visit for a routine checkup.',
    language: 'hi'
  }
];

export const INITIAL_ALERTS: AnomalyAlert[] = [
  {
    id: 'alt-1',
    patientId: 'IND-000126',
    patientName: 'Meenakshi Sundaram',
    timestamp: 'Today, 09:45 AM',
    title: 'Noticeable Performance Deviation',
    description: 'Routine adherence dropped by 18% over the past 48 hours with increased reaction time in symbol search.',
    memoryDelta: -14,
    attentionDelta: -12,
    routineDelta: -18,
    severity: 'moderate',
    acknowledged: false,
    recommendedAction: 'Caregiver telephone check-in and verify hydration/sleep quality.'
  },
  {
    id: 'alt-2',
    patientId: 'IND-000130',
    patientName: 'Hansa Ben Patel',
    timestamp: 'Yesterday, 16:30 PM',
    title: 'Late Afternoon Cognitive Fatigue Pattern',
    description: 'Consecutive evening game latency detected. Game completion rate was 64% vs 88% personal baseline.',
    memoryDelta: -9,
    attentionDelta: -11,
    routineDelta: -6,
    severity: 'low',
    acknowledged: true,
    recommendedAction: 'Shift heavy memory exercises to morning 10:00 AM window.'
  }
];

export const GAMES_CATALOGUE: GameMetadata[] = [
  {
    id: 'local-memory',
    name: 'Cultural Memory',
    nativeName: 'सांस्कृतिक धरोहर / স্মৃতি',
    cognitiveSkill: 'Cultural familiarity',
    skillShort: 'Culture',
    difficulty: 'Easy',
    estimatedDuration: '4 minutes',
    description: 'Remember culturally familiar Indian treasures like Brass Diya, Peacock Feather, Kulhar Chai, and Lotus.',
    theme: 'Pan-Indian Heritage',
    iconName: 'Flower2',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'remember-match',
    name: 'Remember & Match',
    nativeName: 'मनत ৰাখক আৰু মিলাওক / याद रखें और मिलाएँ',
    cognitiveSkill: 'Short-term memory',
    skillShort: 'Memory',
    difficulty: 'Easy',
    estimatedDuration: '5 minutes',
    description: 'Gentle card flip and matching exercise with traditional Indian textile, nature, and sacred motifs.',
    theme: 'Handloom & Folk Motifs',
    iconName: 'Layers',
    color: 'from-teal-700 to-cyan-800'
  },
  {
    id: 'find-symbol',
    name: 'Find the Symbol',
    nativeName: 'प्रतीक खोजें / প্ৰতীকটো বিচাৰক',
    cognitiveSkill: 'Selective attention',
    skillShort: 'Attention',
    difficulty: 'Easy',
    estimatedDuration: '4 minutes',
    description: 'Spot the unique traditional Indian motif or festive symbol among gentle distractors at a calm pace.',
    theme: 'Traditional Patterns',
    iconName: 'Eye',
    color: 'from-emerald-700 to-teal-900'
  },
  {
    id: 'follow-path',
    name: 'Follow the Path',
    nativeName: 'रास्ता खोजें / বাটটো অনুসৰণ কৰক',
    cognitiveSkill: 'Spatial orientation',
    skillShort: 'Spatial',
    difficulty: 'Moderate',
    estimatedDuration: '5 minutes',
    description: 'Trace a calm stepping-stone route across a peaceful courtyard garden path or heritage corridor.',
    theme: 'Courtyards & Heritage Paths',
    iconName: 'Compass',
    color: 'from-amber-700 to-orange-800'
  },
  {
    id: 'remember-routine',
    name: 'Remember the Routine',
    nativeName: 'दिनचर्या स्मरण / দৈনন্দিন কাম মনত ৰাখক',
    cognitiveSkill: 'Daily activity retention',
    skillShort: 'Routine',
    difficulty: 'Easy',
    estimatedDuration: '3 minutes',
    description: 'Sequence daily nourishing steps: morning tea, medicine, hydration, and restful stroll.',
    theme: 'Everyday Wellness',
    iconName: 'CheckCircle2',
    color: 'from-cyan-700 to-blue-800'
  },
  {
    id: 'sequence-recall',
    name: 'Sequence Recall',
    nativeName: 'लय और सुर स्मरण / ক্ৰম অনুসৰণ',
    cognitiveSkill: 'Working memory',
    skillShort: 'Working Memory',
    difficulty: 'Moderate',
    estimatedDuration: '5 minutes',
    description: 'Recall the melody bells and rhythmic chimes of Indian classical instruments (Sitar, Tabla, Bansuri, Ghungroo) in order.',
    theme: 'Indian Classical Melodies',
    iconName: 'Sparkles',
    color: 'from-indigo-700 to-teal-800'
  }
];

// Cultural items for "Cultural Memory" game
export interface CulturalObject {
  id: string;
  name: string;
  nativeName: string;
  symbol: string;
  description: string;
  state: string;
}

export const CULTURAL_OBJECTS: CulturalObject[] = [
  {
    id: 'diya',
    name: 'Brass Diya / Deepam',
    nativeName: 'दीपक / விளக்கு',
    symbol: '🪔',
    description: 'Traditional oil lamp symbolizing warmth, knowledge, and auspicious blessings',
    state: 'Pan-India'
  },
  {
    id: 'peacock',
    name: 'Peacock Feather / Mor Pankh',
    nativeName: 'मोर पंख / ময়ূৰ পাখি',
    symbol: '🪶',
    description: 'National bird of India, beloved symbol of beauty and gentle tranquility',
    state: 'Pan-India'
  },
  {
    id: 'lotus',
    name: 'Sacred Lotus / Kamal',
    nativeName: 'कमल / தாமரை',
    symbol: '🪷',
    description: 'National flower of India, representing purity, resilience, and inner peace',
    state: 'Pan-India'
  },
  {
    id: 'chai_kulhar',
    name: 'Clay Chai Kulhar',
    nativeName: 'कुल्हड़ की चाय / মাটির ভাঁড়',
    symbol: '☕',
    description: 'Fragrant aromatic spiced chai served in traditional baked earthen cups',
    state: 'North, Central & Eastern India'
  },
  {
    id: 'marigold',
    name: 'Marigold Garland / Genda',
    nativeName: 'गेंदे का फूल / চন্দ্রমল্লিকা',
    symbol: '🌼',
    description: 'Vibrant auspicious golden blossoms gracing Indian homes and festivals',
    state: 'Pan-India'
  },
  {
    id: 'bansuri',
    name: 'Bansuri (Bamboo Flute)',
    nativeName: 'बाँसुरी / বাঁহী',
    symbol: '🎋',
    description: 'Ancient melodic instrument revered across Indian classical folklore and devotion',
    state: 'Pan-India'
  },
  {
    id: 'tabla',
    name: 'Classical Tabla / Mridangam',
    nativeName: 'तबला / மிருதங்கம்',
    symbol: '🥁',
    description: 'Traditional rhythm drums evoking celebratory folk and classical concerts',
    state: 'Pan-India'
  },
  {
    id: 'jaapi',
    name: 'Assamese Jaapi & Tea',
    nativeName: 'জাপি আৰু চাহ',
    symbol: '👒',
    description: 'Handcrafted conical woven hat and world-renowned tea heritage of Assam',
    state: 'Assam, India'
  },
  {
    id: 'mango',
    name: 'Alphonso Mango / Aam',
    nativeName: 'आम / മാമ്പഴം',
    symbol: '🥭',
    description: 'National fruit of India, fond nostalgic memories of family summer harvests',
    state: 'Western & Southern India'
  }
];
