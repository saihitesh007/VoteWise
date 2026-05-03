# 🗳️ VoteWise — Indian Election Education Platform

## 1. Project Overview

VoteWise is a production-ready web application designed to educate Indian citizens about the election process. It covers voter registration, EVMs, VVPAT, ballot secrecy, the role of the Election Commission of India, and more — in three languages (English, Hindi, Telugu). The platform is completely politically neutral and encourages civic participation.

## 2. Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 (`darkMode: 'class'`) |
| Routing | react-router-dom v6 |
| Multilanguage | react-i18next + i18next |
| AI Chatbot | Gemini API (`@google/generative-ai`, model: `gemini-1.5-flash`) |
| Text-to-Speech | Web Speech API (browser built-in, no external library) |
| Persistence | localStorage (theme, language, high score) |
| Animations | Framer Motion |
| Deployment | Vercel / Docker + Cloud Run |
| Tests | Vitest + @testing-library/react |

## 3. Features

- **Voter Journey Stepper** — 7-step walkthrough from eligibility check to result declaration. Horizontal on desktop, vertical on mobile. Each step has a TTS narration button. Animated with Framer Motion.
- **Interactive EVM Explainer** — Two-panel layout with a clickable CSS/SVG diagram of the Control Unit, Balloting Unit and VVPAT. 7 numbered steps highlight on click. "Did you know?" facts panel included.
- **Election Glossary** — 25+ terms with real-time search, alphabetical index bar, expandable cards, highlighted search text, and TTS on each definition.
- **Quiz Game** — 15 timed questions (15s each), colour-coded answer feedback, explanation after each answer, score/grade/message on completion, high score saved to localStorage, and question shuffling on restart.
- **Gemini AI Chatbot (VoteBot)** — Stays strictly on Indian election topics, responds in the user's language, shows typing indicator, has 4 suggested questions in empty state, and TTS on every bot reply.
- **Dark Mode** — Persists in localStorage, defaults to system preference, no flash on load.
- **Multilanguage** — EN / HI / TE. Language preference saved to localStorage.
- **Text-to-Speech** — Web Speech API with correct locale (en-IN / hi-IN / te-IN) at 0.9 speed.
- **Accessibility** — Skip-to-main link, aria-labels, aria-current, keyboard navigation, visible focus rings, hierarchical headings, sufficient contrast.

## 4. Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file or deployment settings:

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Yes | Your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/) |
| `VITE_FIREBASE_API_KEY` | Yes | Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase App ID |

## 5. Deployment (Vercel) - Recommended

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and import your project.
3. In the **Environment Variables** section, add all the keys listed in the table above.
4. Click **Deploy**. Vercel will automatically detect the Vite build settings.

## 6. Local Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd votewise

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and add your actual keys

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

*Data sourced from the Election Commission of India (eci.gov.in). VoteWise is not affiliated with ECI or any political party.*
