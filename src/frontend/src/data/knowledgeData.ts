import type { KnowledgeEntry } from "../backend";

export const dummyKnowledgeEntries: KnowledgeEntry[] = [
  {
    id: "1",
    title: "Turmeric Milk for Immunity & Sleep",
    category: "Traditional Medicine",
    language: "Tamil",
    region: "Tamil Nadu",
    description:
      "A warm turmeric milk preparation used for centuries to boost immunity, reduce inflammation, and aid restful sleep.",
    audioUrl: "",
    transcription:
      "மஞ்சள் பால் தயாரிக்க ஒரு டீஸ்பூன் மஞ்சள் பொடியை ஒரு கப் சூடான பாலில் சேர்த்து இரவில் குடிக்க வேண்டும். இதனால் நோய் எதிர்ப்பு சக்தி அதிகரிக்கும்.",
    verified: true,
    contributorAge: 72n,
  },
  {
    id: "2",
    title: "Cold & Cough Remedy with Ginger Honey",
    category: "Food Remedies",
    language: "Tamil",
    region: "Tamil Nadu",
    description:
      "Boiling ginger with honey to create a soothing syrup that relieves cold and cough symptoms naturally.",
    audioUrl: "",
    transcription:
      "சளி இருமல் வந்தால், தேன் இஞ்சியை சேர்த்து கொதிக்க வேண்டும். தினமும் காலையில் குடிக்க வேண்டும். குழந்தைகளுக்கும் கொடுக்கலாம்.",
    verified: true,
    contributorAge: 68n,
  },
  {
    id: "3",
    title: "Millet Porridge for Strength",
    category: "Farming Practices",
    language: "Telugu",
    region: "Andhra Pradesh",
    description:
      "Traditional preparation of kambu (pearl millet) porridge with buttermilk, consumed by farmers for sustained energy during harvest season.",
    audioUrl: "",
    transcription:
      "కంబు గంజి తయారు చేయాలంటే రాత్రంతా నానబెట్టిన జొన్నలు వేసుకుని వేకువజామున వండాలి. మజ్జిగ కలిపి తాగాలి.",
    verified: true,
    contributorAge: 65n,
  },
  {
    id: "4",
    title: "Neem Leaf Pest Repellent",
    category: "Farming Practices",
    language: "Tamil",
    region: "Tamil Nadu",
    description:
      "Ancient organic farming technique using neem leaf extract to repel insects without harming crops or soil health.",
    audioUrl: "",
    transcription:
      "வேப்பிலை கரைசல் தயாரிக்க, ஒரு கிலோ வேப்பிலையை இரண்டு லிட்டர் தண்ணீரில் ஒரு நாள் ஊறவைத்து, வடிகட்டி பயிர்களில் தெளிக்க வேண்டும்.",
    verified: true,
    contributorAge: 77n,
  },
  {
    id: "5",
    title: "Pongal Festival Story & Tradition",
    category: "Cultural Stories",
    language: "Tamil",
    region: "Tamil Nadu",
    description:
      "The cultural significance of Pongal — the harvest festival celebrating the sun god, gratitude, and the bond between nature and community.",
    audioUrl: "",
    transcription:
      "பொங்கல் திருவிழா நான்கு நாட்கள் கொண்டாடப்படும். சூரியனுக்கு நன்றி கூறும் இத்திருவிழா நமது கலாச்சாரத்தின் அடையாளம்.",
    verified: true,
    contributorAge: 80n,
  },
  {
    id: "6",
    title: "Tulsi Ark for Fever & Infections",
    category: "Traditional Medicine",
    language: "Hindi",
    region: "Uttar Pradesh",
    description:
      "Holy basil (tulsi) extract has been used in Ayurvedic tradition for thousands of years to treat fever, respiratory infections, and stress.",
    audioUrl: "",
    transcription:
      "तुलसी के पत्तों को पानी में उबालकर काढ़ा बनाएं। इसमें शहद और अदरक मिलाकर पीने से बुखार और खांसी में राहत मिलती है।",
    verified: false,
    contributorAge: 71n,
  },
  {
    id: "7",
    title: "Sesame Oil Massage for Joint Pain",
    category: "Traditional Medicine",
    language: "Telugu",
    region: "Telangana",
    description:
      "Warm sesame oil massage technique passed down through generations to relieve arthritis, joint pain, and improve circulation.",
    audioUrl: "",
    transcription:
      "నువ్వుల నూనెను వేడి చేసి మోకాళ్ళకు మర్దన చేయాలి. రోజూ చేస్తే కీళ్ళ నొప్పులు తగ్గుతాయి. వృద్ధులకు చాలా మంచిది.",
    verified: true,
    contributorAge: 69n,
  },
  {
    id: "8",
    title: "Rain-Reading Wisdom for Farmers",
    category: "Farming Practices",
    language: "Tamil",
    region: "Tamil Nadu",
    description:
      "Traditional signs elders read from nature — bird behavior, cloud patterns, wind direction — to predict rainfall and plan sowing season.",
    audioUrl: "",
    transcription:
      "கிளிகள் மேற்கு நோக்கி பறந்தால் மழை வரும். சிறகுள்ள எறும்புகள் வெளியே வந்தால் ஒரு வாரத்தில் மழை பெய்யும் என்று முன்னோர் கூறுவர்.",
    verified: true,
    contributorAge: 83n,
  },
];

export const CATEGORIES = [
  "All",
  "Traditional Medicine",
  "Food Remedies",
  "Cultural Stories",
  "Farming Practices",
];
