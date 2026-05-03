import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { steps } from '../../data/journeySteps';
import TTSButton from '../common/TTSButton';
import StepCard from './StepCard';

const translations = {
  en: {},
  hi: {
    'Check Eligibility': 'पात्रता जांचें',
    'Register to Vote': 'मतदाता के रूप में पंजीकरण करें',
    'Get Your Voter ID': 'अपना वोटर आईडी प्राप्त करें',
    'Find Your Polling Booth': 'अपना मतदान केंद्र खोजें',
    'Vote on Election Day': 'मतदान के दिन वोट करें',
    'VVPAT Verification': 'वीवीपैट सत्यापन',
    'Result Declaration': 'परिणाम घोषणा',
    'You must be an Indian citizen, 18+ years old, and resident of your constituency to vote.': 'मतदान करने के लिए आपका भारतीय नागरिक होना, 18 वर्ष या उससे अधिक आयु का होना और अपने निर्वाचन क्षेत्र का निवासी होना आवश्यक है।',
    'NRIs can also register under overseas voters category': 'एनआरआई भी प्रवासी मतदाता श्रेणी में पंजीकरण कर सकते हैं',
    'Fill Form 6 online at voters.eci.gov.in or visit your local BLO (Booth Level Officer).': 'voters.eci.gov.in पर ऑनलाइन फॉर्म 6 भरें या अपने स्थानीय बीएलओ (बूथ लेवल अधिकारी) से मिलें।',
    'Registration closes 30 days before election date': 'पंजीकरण चुनाव तिथि से 30 दिन पहले बंद हो जाता है',
    'Receive your EPIC (Electors Photo Identity Card) by post or download e-EPIC from the NVSP portal.': 'अपना ईपीआईसी (इलेक्टर्स फोटो आइडेंटिटी कार्ड) डाक से प्राप्त करें या एनवीएसपी पोर्टल से ई-ईपीआईसी डाउनलोड करें।',
    'You can also use 12 other documents as identity proof on voting day': 'मतदान के दिन आप पहचान प्रमाण के रूप में 12 अन्य दस्तावेज भी उपयोग कर सकते हैं',
    'Check your polling booth location on the ECI website using your voter ID number or name.': 'ईसीआई वेबसाइट पर अपने वोटर आईडी नंबर या नाम से मतदान केंद्र का स्थान देखें।',
    'Booths are usually within 2km of your residence': 'मतदान केंद्र आमतौर पर आपके निवास से 2 किमी के भीतर होते हैं',
    'Arrive at your polling booth, show your ID, get your finger inked, and press the button on the EVM for your chosen candidate.': 'अपने मतदान केंद्र पर पहुंचें, पहचान पत्र दिखाएं, उंगली पर स्याही लगवाएं और चुने गए उम्मीदवार के लिए ईवीएम पर बटन दबाएं।',
    'You can vote any time during polling hours (usually 7AM–6PM)': 'आप मतदान समय के दौरान कभी भी वोट कर सकते हैं (आमतौर पर सुबह 7 बजे से शाम 6 बजे तक)',
    'After pressing the EVM button, a slip appears on the VVPAT screen for 7 seconds showing your vote. This confirms your vote was recorded correctly.': 'ईवीएम बटन दबाने के बाद वीवीपैट स्क्रीन पर 7 सेकंड के लिए पर्ची दिखाई देती है जो आपका वोट दिखाती है। इससे पुष्टि होती है कि आपका वोट सही दर्ज हुआ है।',
    'VVPAT = Voter Verifiable Paper Audit Trail': 'वीवीपैट = वोटर वेरिफायबल पेपर ऑडिट ट्रेल',
    'Votes are counted on counting day. EVMs are opened, votes tallied, and results declared by the Returning Officer.': 'मतगणना के दिन वोट गिने जाते हैं। ईवीएम खोली जाती है, मतों की गणना होती है और रिटर्निंग अधिकारी परिणाम घोषित करता है।',
    'Results are usually declared within 24 hours of counting start': 'मतगणना शुरू होने के 24 घंटे के भीतर परिणाम सामान्यतः घोषित हो जाते हैं',
  },
  te: {
    'Check Eligibility': 'అర్హతను పరిశీలించండి',
    'Register to Vote': 'ఓటరుగా నమోదు చేసుకోండి',
    'Get Your Voter ID': 'మీ ఓటర్ ఐడి పొందండి',
    'Find Your Polling Booth': 'మీ పోలింగ్ బూత్‌ను కనుగొనండి',
    'Vote on Election Day': 'ఎన్నికల రోజున ఓటు వేయండి',
    'VVPAT Verification': 'వీవీప్యాట్ నిర్ధారణ',
    'Result Declaration': 'ఫలితాల ప్రకటన',
    'You must be an Indian citizen, 18+ years old, and resident of your constituency to vote.': 'ఓటు వేయడానికి మీరు భారతీయ పౌరుడు, 18 ఏళ్లు లేదా అంతకంటే ఎక్కువ వయస్సు కలిగి ఉండాలి మరియు మీ నియోజకవర్గ నివాసి అయి ఉండాలి.',
    'NRIs can also register under overseas voters category': 'ఎన్‌ఆర్‌ఐలు కూడా విదేశీ ఓటర్ల వర్గంలో నమోదు చేసుకోవచ్చు',
    'Fill Form 6 online at voters.eci.gov.in or visit your local BLO (Booth Level Officer).': 'voters.eci.gov.in లో ఆన్‌లైన్‌లో ఫారం 6 నింపండి లేదా మీ స్థానిక బీఎల్ఓ (బూత్ లెవల్ ఆఫీసర్) ను కలవండి.',
    'Registration closes 30 days before election date': 'ఎన్నికల తేదీకి 30 రోజుల ముందు నమోదు ముగుస్తుంది',
    'Receive your EPIC (Electors Photo Identity Card) by post or download e-EPIC from the NVSP portal.': 'మీ ఈపిక్ (ఎలెక్టర్స్ ఫోటో ఐడెంటిటీ కార్డ్) పోస్టు ద్వారా పొందండి లేదా ఎన్‌వీఎస్‌పీ పోర్టల్ నుంచి ఈ-ఈపిక్ డౌన్‌లోడ్ చేసుకోండి.',
    'You can also use 12 other documents as identity proof on voting day': 'ఓటింగ్ రోజున గుర్తింపు రుజువుగా మరో 12 పత్రాలను కూడా ఉపయోగించవచ్చు',
    'Check your polling booth location on the ECI website using your voter ID number or name.': 'మీ ఓటర్ ఐడి నంబర్ లేదా పేరుతో ఈసీఐ వెబ్‌సైట్‌లో పోలింగ్ బూత్ స్థానం తెలుసుకోండి.',
    'Booths are usually within 2km of your residence': 'పోలింగ్ బూత్‌లు సాధారణంగా మీ నివాసానికి 2 కి.మీ లోపే ఉంటాయి',
    'Arrive at your polling booth, show your ID, get your finger inked, and press the button on the EVM for your chosen candidate.': 'మీ పోలింగ్ బూత్‌కు వెళ్లి, ఐడి చూపించి, వేలికి మసి పెట్టించుకుని, ఎంచుకున్న అభ్యర్థికి ఈవీఎం బటన్ నొక్కండి.',
    'You can vote any time during polling hours (usually 7AM–6PM)': 'పోలింగ్ సమయాల్లో ఎప్పుడైనా ఓటు వేయవచ్చు (సాధారణంగా ఉదయం 7 నుంచి సాయంత్రం 6 వరకు)',
    'After pressing the EVM button, a slip appears on the VVPAT screen for 7 seconds showing your vote. This confirms your vote was recorded correctly.': 'ఈవీఎం బటన్ నొక్కిన తర్వాత వీవీప్యాట్ స్క్రీన్‌పై 7 సెకన్ల పాటు ఒక స్లిప్ కనిపిస్తుంది. అది మీ ఓటు సరిగా నమోదైందని నిర్ధారిస్తుంది.',
    'VVPAT = Voter Verifiable Paper Audit Trail': 'వీవీప్యాట్ = ఓటర్ వెరిఫయబుల్ పేపర్ ఆడిట్ ట్రెయిల్',
    'Votes are counted on counting day. EVMs are opened, votes tallied, and results declared by the Returning Officer.': 'కౌంటింగ్ రోజున ఓట్లు లెక్కిస్తారు. ఈవీఎంలను తెరిచి, ఓట్లను లెక్కించి, రిటర్నింగ్ ఆఫీసర్ ఫలితాలను ప్రకటిస్తారు.',
    'Results are usually declared within 24 hours of counting start': 'కౌంటింగ్ ప్రారంభమైన 24 గంటల్లో ఫలితాలు సాధారణంగా ప్రకటిస్తారు',
  },
};

const localizeStep = (step, language) => ({
  ...step,
  title: translations[language]?.[step.title] || step.title,
  description: translations[language]?.[step.description] || step.description,
  tip: translations[language]?.[step.tip] || step.tip,
});

export default function VoterJourney() {
  const { t, i18n } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const localizedSteps = useMemo(
    () => steps.map((step) => localizeStep(step, i18n.language?.slice(0, 2))),
    [i18n.language]
  );
  const currentStep = localizedSteps[activeStep];

  return (
    <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">{t('journey.title')}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {activeStep + 1} of {localizedSteps.length} steps
          </p>
        </div>
        <div className="w-full max-w-xs">
          <div className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Progress</span>
            <span>{activeStep + 1}/{localizedSteps.length}</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all dark:bg-blue-400"
              style={{ width: `${((activeStep + 1) / localizedSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:overflow-x-auto">
        {localizedSteps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            isActive={index === activeStep}
            isComplete={index < activeStep}
            onClick={() => setActiveStep(index)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="mt-8 rounded-[1.75rem] border border-blue-100 bg-blue-50/60 p-6 dark:border-blue-900/50 dark:bg-blue-950/10"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
                {t('journey.step')} {currentStep.id}
              </p>
              <h3 className="mt-2 text-2xl font-black">{currentStep.title}</h3>
            </div>
            <TTSButton text={`${currentStep.title}. ${currentStep.description}. Tip: ${currentStep.tip}`} />
          </div>
          <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-200">{currentStep.description}</p>
          <p className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            Tip: {currentStep.tip}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActiveStep((step) => Math.max(step - 1, 0))}
          disabled={activeStep === 0}
          className="focus-ring rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setActiveStep((step) => Math.min(step + 1, localizedSteps.length - 1))}
          disabled={activeStep === localizedSteps.length - 1}
          className="focus-ring rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          Next
        </button>
      </div>
    </section>
  );
}
