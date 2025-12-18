
import { SupportedLanguage } from '../types';

export const LANGUAGES: Record<SupportedLanguage, { name: string; nativeName: string }> = {
  en: { name: 'English', nativeName: 'English' },
  hi: { name: 'Hindi', nativeName: 'हिंदी' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்' },
  te: { name: 'Telugu', nativeName: 'తెలుగు' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ml: { name: 'Malayalam', nativeName: 'മലയാളം' },
};

export const VOICE_SCRIPTS = {
  en: {
    welcome: "Welcome to VOXFIT. Train smarter. Stay consistent.",
    warmup: "Let’s start your VOXFIT warm-up.\nMove your neck slowly.\nRoll your shoulders back.\nBreathe normally.\nGood. You’re ready.",
    squats: "Get ready for squats.\nFeet shoulder-width apart.\nLower slowly.\nPush up through your heels.\nGood job. Rest.",
    motivation: "This is VOXFIT. Let’s begin your workout. Consistency matters.\nKeep going.",
    safety: "If you feel pain, stop immediately.\nRest and drink water.",
    form_cues: {
      squat: "Chest up. Push through your heels. Maintain a straight back.",
      bench: "Retract your shoulder blades. Feet flat on the floor. Control the bar down.",
      deadlift: "Keep the bar close to your shins. Hips down. Chest up. Pull the slack out.",
      overhead: "Tight core. Don't arch your back. Push your head through at the top.",
      general: "Control the weight. Don't let gravity do the work. Squeeze at the top."
    }
  },
  hi: {
    welcome: "VOXFIT में आपका स्वागत है। स्मार्ट तरीके से ट्रेन करें। निरंतर रहें।",
    warmup: "VOXFIT वार्म-अप शुरू करते हैं।\nगर्दन धीरे घुमाएँ।\nकंधे पीछे घुमाएँ।\nसांस सामान्य रखें।\nअच्छा किया।",
    squats: "स्क्वाट के लिए तैयार हो जाएँ।\nपैर कंधे की चौड़ाई में रखें।\nधीरे नीचे जाएँ।\nएड़ी से ऊपर उठें।\nअच्छा। अब आराम करें।",
    motivation: "यह VOXFIT है। वर्कआउट शुरू करें। निरंतरता ज़रूरी है।",
    safety: "अगर दर्द हो, तो तुरंत रुकें।\nआराम करें और पानी पिएँ।",
    form_cues: {
      squat: "छाती ऊपर रखें। एड़ी से जोर लगाएँ। कमर सीधी रखें।",
      bench: "कंधों को पीछे खींचें। पैर ज़मीन पर जमाकर रखें। बार को धीरे नीचे लाएँ।",
      deadlift: "बार को पैरों के पास रखें। हिప్्स नीचे। छाती ऊपर।",
      overhead: "पेट टाइट रखें। पीठ को ज्यादा न मोड़ें।",
      general: "वजन पर काबू रखें। सांस लेते रहें। फॉर्म पर ध्यान दें।"
    }
  },
  ta: {
    welcome: "VOXFIT-க்கு வரவேற்கிறோம். புத்திசாலித்தனமாக உடற்பயிற்சி செய்யுங்கள். தொடர்ந்து இருங்கள்.",
    warmup: "VOXFIT வார்ம்-అப் தொடங்கலாம்.\nகழுத்தை மெதுவாக அசைக்கவும்.\nதோள்களை பின்னால் சுழற்றவும்.\nசாதாரணமாக மூச்சு விடுங்கள்.\nநன்றாக செய்தீர்கள்.",
    squats: "ஸ்க்வாட் செய்ய தயாராகுங்கள்.\nகால்களை தோளளவில் வையுங்கள்.\nமெதுவாக உட்காருங்கள்.\nமுட்டியால் அழுத்தி எழுங்கள்.\nநன்று. ஓய்வு.",
    motivation: "இது VOXFIT. உங்கள் வொர்க்அவுட்டைத் தொடங்கலாம். தொடர்ச்சி முக்கியம்.",
    safety: "வலி இருந்தால் நிறுத்துங்கள்.\nஓய்வு எடுத்து தண்ணீர் குடிக்கவும்.",
    form_cues: {
      squat: "மார்பை நிமிர்த்தி வையுங்கள். குதிகால் மூலம் அழுத்துங்கள். முதுகை நேராக வையுங்கள்.",
      bench: "தோள்பட்டையை பின்னால் இழுக்கவும். கால்களை தரையில் பதிக்கவும்.",
      deadlift: "பாரை கால்களுக்கு அருகில் வையுங்கள். மார்பை நிமிர்த்துங்கள்.",
      overhead: "வயிற்றை இறுக்கமாக வையுங்கள். முதுகை வளைக்காதீர்கள்.",
      general: "எடையை கட்டுப்படுத்துங்கள். மெதுவாக மூச்சு விடுங்கள்."
    }
  },
  te: {
    welcome: "VOXFITకు స్వాగతం. తెలివిగా వ్యాయామం చేయండి. స్థిరంగా ఉండండి.",
    warmup: "VOXFIT వార్మ్-అప్ మొదలుపెడదాం.\nమెడను నెమ్మదిగా కదపండి.\nభుజాలను వెనక్కి తిప్పండి.\nసాధారణంగా శ్వాస తీసుకోండి.\nబాగా చేశారు.",
    squats: "స్క్వాట్స్‌కు సిద్ధంగా ఉండండి.\nకాళ్లు భుజాల వెడల్పులో ఉంచండి.\nనెమ్మదిగా కిందకు వెళ్లండి.\nమడమలపై ఒత్తిడి పెట్టి లేచండి.\nమంచిది. విశ్రాంతి.",
    motivation: "ఇది VOXFIT. మీ వ్యాయామాన్ని ప్రారంభిద్దాం. స్థిరత్వం ముఖ్యం.",
    safety: "నొప్పి ఉంటే వెంటనే ఆపండి.\nవిశ్రాంతి తీసుకుని నీరు తాగండి.",
    form_cues: {
      squat: "ఛాతీని పైకి ఉంచండి. మడమలతో నెట్టండి. వీపు నిటారుగా ఉంచండి.",
      bench: "భుజాలను వెనక్కి లాగండి. పాదాలను నేలమీద ఉంచండి.",
      deadlift: "బార్‌ను కాళ్లకు దగ్గరగా ఉంచండి. ఛాతీ పైకి.",
      overhead: "నడుము నిటారుగా ఉంచండి. వెనక్కి వంచకండి.",
      general: "బరువును నియంత్రించండి. శ్వాస తీసుకుంటూ ఉండండి."
    }
  },
  kn: {
    welcome: "VOXFIT ಗೆ ಸುಸ್ವಾಗತ. ಸ್ಮಾರ್ಟ್ ಆಗಿ ತರಬೇತಿ ನೀಡಿ. ನಿರಂತರವಾಗಿರಿ.",
    warmup: "VOXFIT ವಾರ್ಮ್-ಅಪ್ ಆರಂಭಿಸೋಣ.\nಕತ್ತೆಯನ್ನು ನಿಧಾನವಾಗಿ ಕದಡಿ.\nಭುಜಗಳನ್ನು ಹಿಂದಕ್ಕೆ ತಿರುಗಿಸಿ.\nಸಾಮಾನ್ಯವಾಗಿ ಉಸಿರಾಟ ಮಾಡಿ.\nಚೆನ್ನಾಗಿದೆ.",
    squats: "ಸ್ಕ್ವಾಟ್‌ಗೆ ಸಿದ್ಧರಾಗಿ.\nಕಾಲುಗಳನ್ನು ಭುಜ ಅಗಲದಲ್ಲಿ ಇಡಿ.\nನಿಧಾನವಾಗಿ ಕೆಳಗೆ ಇಳಿಯಿರಿ.\nಮಡಿಲಿನಿಂದ ಒತ್ತಿ ಏಳಿರಿ.\nಚೆನ್ನಾಗಿದೆ. ವಿಶ್ರಾಂತಿ.",
    motivation: "ಇದು VOXFIT. ನಿಮ್ಮ ವ್ಯಾಯಾಮವನ್ನು ಆರಂಭಿಸೋಣ. ನಿರಂತರತೆ ಮುಖ್ಯ.",
    safety: "ನೋವು ಇದ್ದರೆ ತಕ್ಷಣ ನಿಲ್ಲಿಸಿ.\nವಿಶ್ರಾಂತಿ ಮಾಡಿ ನೀರು ಕುಡಿಯಿರಿ.",
    form_cues: {
      squat: "ಎದೆಯನ್ನು ಎತ್ತರದಲ್ಲಿಡಿ. ಹಿಮ್ಮಡಿಯಿಂದ ಒತ್ತಿ. ಬೆನ್ನನ್ನು ನೇರವಾಗಿಡಿ.",
      bench: "ಭುಜಗಳನ್ನು ಹಿಂದಕ್ಕೆ ಎಳೆಯಿರಿ. ಪಾದಗಳನ್ನು ನೆಲದ ಮೇಲೆ ಊರಿ.",
      deadlift: "ಬಾರ್ ಅನ್ನು ಕಾಲುಗಳಿಗೆ ಹತ್ತಿರ ಇರಿಸಿ. ಎದೆ ಎತ್ತಿ.",
      overhead: "ಹೊಟ್ಟೆಯನ್ನು ಬಿಗಿಯಾಗಿಡಿ. ಬೆನ್ನನ್ನು ಬಾಗಿಸಬೇಡಿ.",
      general: "ತೂಕವನ್ನು ನಿಯಂತ್ರಿಸಿ. ಉಸಿರಾಟದ ಕಡೆ ಗಮನ ಕೊಡಿ."
    }
  },
  ml: {
    welcome: "VOXFIT-ലേക്ക് സ്വാഗതം. സ്മാർട്ടായി വ്യായാമം ചെയ്യുക. സ്ഥിരത പാലിക്കുക.",
    warmup: "VOXFIT വാം-അപ്പ് ആരംഭിക്കാം.\nകഴുത്ത് പതുക്കെ ചലിപ്പിക്കുക.\nതോൾ പിന്നിലേക്ക് തിരിക്കുക.\nസാധാരണയായി ശ്വസിക്കുക.\nനന്നായി.",
    squats: "സ്ക്വാട്ടിനായി തയ്യാറാകൂ.\nകാലുകൾ തോളിന്റെ വീതിയിൽ വയ്ക്കുക.\nപതുക്കെ താഴേക്ക് പോകുക.\nമുട്ടയിലൂടെ തള്ളിയുയരുക.\nനന്നായി. വിശ്രമിക്കുക.",
    motivation: "ഇത് VOXFIT ആണ്. വ്യായാമം ആരംഭിക്കാം. സ്ഥിരത പ്രധാനമാണ്.",
    safety: "വേദന ഉണ്ടെങ്കിൽ ഉടൻ നിർത്തുക.\nവിശ്രമിച്ച് വെള്ളം കുടിക്കുക.",
    form_cues: {
      squat: "നെഞ്ച് ഉയർത്തിപ്പിടിക്കുക. ഉപ്പൂറ്റിയിൽ അമർത്തുക. നടുവ് നിവർത്തി വെക്കുക.",
      bench: "തോളുകൾ പിന്നിലേക്ക് വലിക്കുക. പാദങ്ങൾ തറയിൽ ഉറപ്പിക്കുക.",
      deadlift: "ബാർ കാലുകളോട് ചേർത്ത് പിടിക്കുക. നെഞ്ച് ഉയർത്തുക.",
      overhead: "വയർ മുറുക്കിപ്പിടിക്കുക. നടുവ് വളയ്ക്കരുത്.",
      general: "ഭാരം നിയന്ത്രിക്കുക. ശരിയായ രീതിയിൽ ശ്വസിക്കുക."
    }
  }
};

export const TRANSLATIONS = {
  en: {
    nav: {
      dashboard: 'Home',
      voice: 'Voice Trainer',
      workouts: 'Workout',
      nutrition: 'Nutrition',
      creator: 'Profile',
      coach: 'Coach',
      premium: 'Upgrade'
    },
    dashboard: {
      welcome: 'Welcome Back',
      objective: "Today's Objective",
      streak: 'Streak',
      start: 'Start Workout',
      askCoach: 'Ask VOXFIT Coach',
      nutrition: 'Nutrition Lab',
      newPlan: 'Forge Plan',
      load: 'Weekly Load'
    },
    actions: {
      start_workout: 'Start Workout',
      pause: 'Pause',
      resume: 'Resume',
      end: 'End'
    },
    premium: {
      title: 'Upgrade to VOXFIT Premium',
      subtitle: 'Train Smarter. Stay Consistent.',
      monthly: 'Monthly',
      yearly: 'Yearly',
      bestValue: 'Best Value',
      save: 'Save',
      start: 'Get VOXFIT Premium',
      free: 'Continue Free',
      features: {
        coach: 'Personal VOXFIT AI Coach',
        coach_desc: 'VOXFIT Premium unlocks all features including adaptive plans.',
        stats: 'Elite Discipline',
        stats_desc: 'Smart tracking • Streaks & milestones',
        local: 'India-Optimized',
        local_desc: 'Regional languages • Desi nutrition advice'
      },
      trust: {
        cancel: 'Cancel anytime via Google Play',
        secure: 'Secure payments via Google Play',
        noAds: 'No ads. No noise.',
        autoRenew: 'VOXFIT offers optional auto-renewing subscriptions.'
      }
    },
    voice: {
      title: 'VOX Session',
      status: {
        tap: 'Tap to Connect to VOXFIT',
        connecting: 'Connecting...',
        listening: 'Listening...',
        speaking: 'VOX Coach Speaking...',
        error: 'Error'
      },
      protocols: {
        warmup: 'Warm Up',
        squats: 'Squats',
        cardio: 'Cardio',
        bench: 'Bench Press',
        pushups: 'Push Ups',
        cooldown: 'Cool Down'
      }
    },
    voice_prompts: {
      speak_now: 'Speak now',
      listening: 'Listening…',
      repeat: 'Repeat'
    },
    guidance: {
      get_ready: 'Get ready',
      rest: 'Rest',
      breathe: 'Breathe',
      good_job: 'Good job'
    },
    safety: {
      stop_if_pain: 'Stop if you feel pain',
      hydrate: 'Drink water',
      consult: 'Consult a professional'
    },
    nutrition: {
      add_protein: 'Add protein',
      drink_water: 'Drink water',
      balanced_meal: 'Balanced meal'
    },
    motivation: {
      consistency: 'Consistency matters',
      streak: 'Workout streak',
      keep_going: 'Keep going'
    },
    status: {
      offline: 'Offline mode',
      try_again: 'Try again',
      no_internet: 'No internet'
    }
  },
  hi: {
    nav: {
      dashboard: 'होम',
      voice: 'वॉयस ट्रेनर',
      workouts: 'वर्कआउट',
      nutrition: 'डाइट',
      creator: 'प्रोफ़ाइल',
      coach: 'कोच',
      premium: 'अपग्रेड'
    },
    dashboard: {
      welcome: 'स्वागत है',
      objective: "आज का लक्ष्य",
      streak: 'स्ट्रीक',
      start: 'वर्कआउट शुरू करें',
      askCoach: 'VOXFIT कोच',
      nutrition: 'डाइट',
      newPlan: 'नया प्लान',
      load: 'साप्ताहिक लोड'
    },
    premium: {
      title: 'VOXFIT प्रीमियम में अपग्रेड करें',
      subtitle: 'होशियारी से ट्रेन करें। निरंतर रहें।',
      monthly: 'मासिक',
      yearly: 'वार्षिक',
      bestValue: 'सबसे अच्छा',
      save: 'बचत',
      start: 'प्रीमियम शुरू करें',
      free: 'फ्री जारी रखें',
      features: {
        coach: 'पर्सनल VOXFIT AI कोच',
        coach_desc: 'वॉइस गाइडेंस और एडाप्टिव प्लान',
        stats: 'अनुशासन',
        stats_desc: 'स्मार्ट ट्रैकिंग और स्ट्रीक्स',
        local: 'भारतीय फिटनेस',
        local_desc: 'क्षेत्रীয় भाषाएं और देसी डाइट'
      },
      trust: {
        cancel: 'Google Play के माध्यम से कभी भी रद्द करें',
        secure: 'Google Play सुरक्षित भुगतान',
        noAds: 'कोई विज्ञापन नहीं',
        autoRenew: 'VOXFIT वैकल्पिक ऑटो-रिन्यूअल सब्सक्रिप्शन प्रदान करता है।'
      }
    },
    actions: {
      start_workout: 'वर्कआउट शुरू करें',
      pause: 'रोकें',
      resume: 'फिर शुरू करें',
      end: 'समाप्त करें'
    },
    voice: {
      title: 'VOX सेशन',
      status: {
        tap: 'कनेक्ट करें',
        connecting: 'कनेक्ट हो रहा है...',
        listening: 'सुन रहा हूँ...',
        speaking: 'कोच बोल रहा है...',
        error: 'त्रुटि'
      },
      protocols: {
        warmup: 'वार्म-अप',
        squats: 'स्क्वैट्स',
        cardio: 'कार्डियो',
        bench: 'बेंच प्रेस',
        pushups: 'पुश-अप्स',
        cooldown: 'कूल डाउन'
      }
    },
    voice_prompts: {
      speak_now: 'बोलें',
      listening: 'सुन रहा है…',
      repeat: 'दोहराएं'
    },
    guidance: {
      get_ready: 'तैयार हो जाएं',
      rest: 'आराम करें',
      breathe: 'सांस लें',
      good_job: 'अच्छा किया'
    },
    safety: {
      stop_if_pain: 'दर्द हो तो रुकें',
      hydrate: 'पानी पिएं',
      consult: 'विशेषज्ञ से सलाह लें'
    },
    nutrition: {
      add_protein: 'प्रोटीन जोड़ें',
      drink_water: 'पानी पिएं',
      balanced_meal: 'संतुलित भोजन'
    },
    motivation: {
      consistency: 'निरंतरता ज़रूरी है',
      streak: 'वर्कआउट स्ट्रीक',
      keep_going: 'जारी रखें'
    },
    status: {
      offline: 'ऑफ़लाइन मोड',
      try_again: 'फिर कोशिश करें',
      no_internet: 'इंटरनेट नहीं'
    }
  },
  ta: {
    nav: {
      dashboard: 'முகப்பு',
      voice: 'குரல் பயிற்சியாளர்',
      workouts: 'உடற்பயிற்சி',
      nutrition: 'உணவு முறை',
      creator: 'சுயவிவரம்',
      coach: 'பயிற்சியாளர்',
      premium: 'மேம்படுத்து'
    },
    dashboard: {
      welcome: 'வணக்கம்',
      objective: "இன்றைய குறிக்கோள்",
      streak: 'தொடர் நாட்கள்',
      start: 'பயிற்சி தொடங்கு',
      askCoach: 'VOXFIT பயிற்சியாளர்',
      nutrition: 'உணவு',
      newPlan: 'புதிய திட்டம்',
      load: 'வாராந்திர சுமை'
    },
    actions: {
      start_workout: 'பயிற்சி தொடங்கு',
      pause: 'இடைநிறுத்து',
      resume: 'தொடரு',
      end: 'முடி'
    },
    voice: {
      title: 'VOX அமர்வு',
      status: {
        tap: 'இணைக்க',
        connecting: 'இணைக்கிறது...',
        listening: 'கேட்கிறது...',
        speaking: 'பேசுகிறார்...',
        error: 'பிழை'
      },
      protocols: {
        warmup: 'வார்ம் அப்',
        squats: 'ஸ்க்வாட்ஸ்',
        cardio: 'கார்டியோ',
        bench: 'பெஞ்ச் பிரஸ்',
        pushups: 'புஷ் அப்',
        cooldown: 'கூல் டவுன்'
      }
    },
    voice_prompts: {
      speak_now: 'பேசுங்கள்',
      listening: 'கேட்கிறது…',
      repeat: 'மீண்டும்'
    },
    guidance: {
      get_ready: 'தயாராகுங்கள்',
      rest: 'ஓய்வு',
      breathe: 'மூச்சு விடு',
      good_job: 'நல்ல வேலை'
    },
    safety: {
      stop_if_pain: 'வலி இருந்தால் நிறுத்து',
      hydrate: 'தண்ணீர் குடி',
      consult: 'நிபுணரை அணுகவும்'
    },
    nutrition: {
      add_protein: 'புரதம் சேர்க்கவும்',
      drink_water: 'தண்ணீர் குடி',
      balanced_meal: 'சமநிலை உணவு'
    },
    motivation: {
      consistency: 'தொடர்ச்சி முக்கியம்',
      streak: 'பயிற்சி தொடர்',
      keep_going: 'தொடருங்கள்'
    },
    status: {
      offline: 'ஆஃப்லைன் முறை',
      try_again: 'மீண்டும் முயற்சி',
      no_internet: 'இணையம் இல்லை'
    }
  },
  te: {
    nav: { dashboard: 'హోమ్', voice: 'వాయిస్ ట్రైనర్', workouts: 'వ్యాయామం', nutrition: 'న్యూట్రిషన్', creator: 'ప్రొఫైల్', coach: 'కోచ్', premium: 'అప్‌గ్రేడ్' },
    dashboard: { welcome: 'స్వాగతం', objective: "ఈ రోజు లక్ష్యం", streak: 'స్ట్రీక్', start: 'వ్యాయామం ప్రారంభించండి', askCoach: 'VOXFIT కోచ్', nutrition: 'ఆహారం', newPlan: 'కొత్త ప్లాన్', load: 'లోడ్' },
    actions: { start_workout: 'వ్యాయామం ప్రారంభించండి', pause: 'నిలిపివేయి', resume: 'మళ్లీ ప్రారంభించండి', end: 'ముగించండి' },
    voice: { title: 'VOX సెషన్', status: { tap: 'కనెక్ట్', connecting: 'కనెక్టింగ్...', listening: 'వింటున్నాను...', speaking: 'మాట్లాడుతున్నారు...', error: 'లోపం' }, protocols: { warmup: 'వార్మప్', squats: 'స్క్వాట్స్', cardio: 'కార్డియో', bench: 'బెంచ్ ప్రెస్', pushups: 'పుషప్స్', cooldown: 'కూల్ డౌన్' } },
    voice_prompts: { speak_now: 'మాట్లాడండి', listening: 'వింటోంది…', repeat: 'మళ్లీ చెప్పండి' },
    guidance: { get_ready: 'సిద్ధంగా ఉండండి', rest: 'విశ్రాంతి', breathe: 'శ్వాస తీసుకోండి', good_job: 'బాగా చేశారు' },
    safety: { stop_if_pain: 'నొప్పి ఉంటే ఆపండి', hydrate: 'నీరు తాగండి', consult: 'నిపుణుడిని సంప్రదించండి' },
    nutrition: { add_protein: 'ప్రోటీన్ జోడించండి', drink_water: 'నీరు తాగండి', balanced_meal: 'സമతుల్య భోజనం' },
    motivation: { consistency: 'స్థిరత్వం ముఖ్యం', streak: 'వ్యాయామ పరంపర', keep_going: 'కొనసాగించండి' },
    status: { offline: 'ఆఫ్‌లైన్ మోడ్', try_again: 'మళ్లీ ప్రయత్నించండి', no_internet: 'ఇంటర్నెట్ లేదు' }
  },
  kn: {
    nav: { dashboard: 'ಮುಖಪುಟ', voice: 'ವಾಯ್ಸ್ ಟ್ರೈನರ್', workouts: 'ವ್ಯಾಯಾಮ', nutrition: 'ಪೋಷಣೆ', creator: 'ಪ್ರೊಫೈಲ್', coach: 'ಕೋಚ್', premium: 'ಅಪ್‌ಗ್ರೇಡ್' },
    dashboard: { welcome: 'ಸ್ವಾಗತ', objective: "ಇಂದಿನ ಗುರಿ", streak: 'ಸ್ಟ್ರೀಕ್', start: 'ವ್ಯಾಯಾಮ ಆರಂಭಿಸಿ', askCoach: 'VOXFIT ಕೋಚ್', nutrition: 'ಆಹಾರ', newPlan: 'ಹೊಸ ಪ್ಲಾನ್', load: 'ಲೋಡ್' },
    actions: { start_workout: 'ವ್ಯಾಯಾಮ ಆರಂಭಿಸಿ', pause: 'ತಾತ್ಕಾಲಿಕ ನಿಲ್ಲಿಸಿ', resume: 'ಮುಂದುವರಿಸಿ', end: 'ಮುಗಿಸಿ' },
    voice: { title: 'VOX ಸೆಷನ್', status: { tap: 'ಸಂಪರ್ಕಿಸಿ', connecting: 'ಸಂಪರ್ಕಿಸುತ್ತಿದೆ...', listening: 'ಕೇಳುತ್ತಿದೆ...', speaking: 'ಮಾತನಾಡುತ್ತಿದ್ದಾರೆ...', error: 'ದೋಷ' }, protocols: { warmup: 'ವಾರ್ಮ್ ಅಪ್', squats: 'ಸ್ಕ್ವಾಟ್ಸ್', cardio: 'ಕಾರ್ಡಿಯೋ', bench: 'ಬೆಂಚ್ ಪ್ರೆಸ್', pushups: 'ಪುಷ್ ಅಪ್', cooldown: 'ಕೂಲ್ ಡೌನ್' } },
    voice_prompts: { speak_now: 'ಮಾತನಾಡಿ', listening: 'ಕೇಳುತ್ತಿದೆ…', repeat: 'ಮರುಕಳಿಸಿ' },
    guidance: { get_ready: 'ಸಿದ್ಧರಾಗಿ', rest: 'ವಿಶ್ರಾಂತಿ', breathe: 'ಉಸಿರಾಟ', good_job: 'ಚೆನ್ನಾಗಿದೆ' },
    safety: { stop_if_pain: 'ನೋವು ಇದ್ದರೆ ನಿಲ್ಲಿಸಿ', hydrate: 'ನೀರು ಕುಡಿಯಿರಿ', consult: 'ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ' },
    nutrition: { add_protein: 'ಪ್ರೋಟೀನ್ ಸೇರಿಸಿ', drink_water: 'ನೀರು ಕುಡಿಯಿರಿ', balanced_meal: 'ಸಮತೋಲನ ಆಹಾರ' },
    motivation: { consistency: 'ನಿರಂತರತೆ ಮುಖ್ಯ', streak: 'ವ್ಯಾಯಾಮ ಸరణಿ', keep_going: 'ಮುಂದುವರಿಸಿ' },
    status: { offline: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್', try_again: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ', no_internet: 'ಇಂಟರ್ನೆಟ್ ಇಲ್ಲ' }
  },
  ml: {
    nav: { dashboard: 'ഹോം', voice: 'വോയിസ് ട്രെയിനർ', workouts: 'വ്യായാമം', nutrition: 'ഭക്ഷണം', creator: 'പ്രൊഫൈൽ', coach: 'കോച്ച്', premium: 'അപ്‌ഗ്രേഡ്' },
    dashboard: { welcome: 'സ്വാഗതം', objective: "ഇന്നത്തെ ലക്ഷ്യം", streak: 'സ്ട്രീക്ക്', start: 'വ്യായാമം ആരംഭിക്കുക', askCoach: 'VOXFIT കോച്ച്', nutrition: 'ഭക്ഷണം', newPlan: 'പുതിയ പ്ലാൻ', load: 'ലോഡ്' },
    actions: { start_workout: 'വ്യായാമം ആരംഭിക്കുക', pause: 'നിർത്തുക', resume: 'തുടരുക', end: 'അവസാനിപ്പിക്കുക' },
    voice: { title: 'VOX സെഷൻ', status: { tap: 'കണക്ട് ചെയ്യൂ', connecting: 'കണക്ട് ചെയ്യുന്നു...', listening: 'കേൾക്കുന്നു...', speaking: 'സംസാരിക്കുന്നു...', error: 'പിശക്' }, protocols: { warmup: 'വാം അപ്പ്', squats: 'സ്ക്വാറ്റ്സ്', cardio: 'കാർഡിയോ', bench: 'ബെഞ്ച് പ്രസ്സ്', pushups: 'പുഷ് അപ്പ്', cooldown: 'കൂൾ ഡൗൺ' } },
    voice_prompts: { speak_now: 'സംസാരിക്കുക', listening: 'കേൾക്കുന്നു…', repeat: 'വീണ്ടും പറയുക' },
    guidance: { get_ready: 'തയ്യാറാകൂ', rest: 'വിശ്രമം', breathe: 'ശ്വസിക്കുക', good_job: 'നല്ലത്' },
    safety: { stop_if_pain: 'വേദന ഉണ്ടെങ്കിൽ നിർത്തുക', hydrate: 'വെള്ളം കുടിക്കുക', consult: 'വിദഗ്ധനെ സമീപിക്കുക' },
    nutrition: { add_protein: 'പ്രോട്ടീൻ ചേർക്കുക', drink_water: 'വെള്ളം കുടിക്കുക', balanced_meal: 'സമതുലിത ഭക്ഷണം' },
    motivation: { consistency: 'സ്ഥിരത പ്രധാനമാണ്', streak: 'വ്യായാമ തുടർച്ച', keep_going: 'തുടരൂ' },
    status: { offline: 'ഓഫ്‌ലൈൻ മോഡ്', try_again: 'വീണ്ടും ശ്രമിക്കുക', no_internet: 'ഇന്റർനെറ്റ് ഇല്ല' }
  }
};

export const getTranslation = (lang: SupportedLanguage, path: string) => {
  const parts = path.split('.');
  let current: any = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  for (const part of parts) {
    if (current[part] === undefined) return path;
    current = current[part];
  }
  return current;
};
