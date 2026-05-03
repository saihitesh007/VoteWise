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
| Deployment | Docker multi-stage → Google Cloud Run (port 8080) |
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

## 4. Google Services Used

- **Gemini API** — Powers the VoteBot chatbot via `@google/generative-ai` npm package. Model: `gemini-1.5-flash`.
- **Google Cloud Run** — Intended deployment target. The Docker image listens on port 8080 (Cloud Run default).
- **Google Fonts** — Inter font loaded via CDN in `index.html` for premium typography.

## 5. Local Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd votewise

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and add your Gemini API key:
# VITE_GEMINI_API_KEY=your_actual_key_here

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

## 6. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Yes | Your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/) |

> ⚠️ **Never commit `.env` to version control.** It is already listed in `.gitignore`. Only commit `.env.example`.

## 7. Deployment (Docker + Cloud Run)

### Build and run locally with Docker

```bash
# Build the image
docker build -t votewise .

# Run locally on port 8080
docker run -p 8080:8080 votewise
```

### Deploy to Google Cloud Run

```bash
# Authenticate
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Build and push to Google Artifact Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/votewise

# Deploy to Cloud Run
gcloud run deploy votewise \
  --image gcr.io/YOUR_PROJECT_ID/votewise \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars VITE_GEMINI_API_KEY=your_key_here
```

> **Note:** Since `VITE_GEMINI_API_KEY` is a build-time variable (not a runtime secret), it must be baked into the image at build time. For production, consider using a backend proxy to avoid exposing the key in the client bundle.

## 8. Accessibility Features

- **Skip-to-main-content** link at the very top of every page
- **`aria-label`** on all interactive elements (buttons, inputs, nav links)
- **`aria-current="page"`** on the active navigation link
- **`aria-expanded`** on accordion/expandable elements (Glossary, mobile menu)
- **`aria-selected`** on tab-like elements (fact carousel dots)
- **Keyboard navigation** — Tab, Enter, Escape, arrow keys all work correctly
- **Visible focus rings** — 2px outline on all focusable elements
- **Hierarchical headings** — Single `<h1>` per page, then `<h2>`, `<h3>`
- **Color is never the only indicator** — Icons and text always accompany color coding
- **Sufficient contrast** — Color palette chosen for ≥ 4.5:1 contrast ratio
- **`<label>` for all inputs** — Chat textarea and Glossary search both have visible or sr-only labels

## 9. Multilanguage Support

Three languages are supported and can be switched at any time via the Language Switcher in the Navbar and Footer:

| Language | Code | Native Name |
|---|---|---|
| English | `en` | English |
| Hindi | `hi` | हिंदी |
| Telugu | `te` | తెలుగు |

Language preference is saved to `localStorage` key `votewise-lang` and restored on next visit.

Text-to-speech uses the correct locale per language:
- English → `en-IN`
- Hindi → `hi-IN`
- Telugu → `te-IN`

## 10. Running Tests

```bash
npm run test
```

Four tests are included:

| File | Tests |
|---|---|
| `quiz.test.js` | Shuffling returns same 15 questions; score increments correctly; timer expiry advances question |
| `tts.test.js` | Hook returns speak/stop/isSpeaking; speak() called with correct language code |

## Project Structure

```
votewise/
├── public/locales/{en,hi,te}/translation.json   # i18n translation files
├── src/
│   ├── main.jsx / App.jsx / i18n.js / styles.css
│   ├── components/
│   │   ├── layout/    Navbar.jsx  Footer.jsx
│   │   ├── chatbot/   ChatBot.jsx  ChatMessage.jsx
│   │   ├── quiz/      QuizGame.jsx  ScoreCard.jsx
│   │   ├── journey/   VoterJourney.jsx  StepCard.jsx
│   │   ├── evm/       EVMExplainer.jsx
│   │   ├── glossary/  Glossary.jsx
│   │   └── common/    TTSButton.jsx  DarkModeToggle.jsx  LanguageSwitcher.jsx
│   ├── pages/         Home  Learn  Quiz  ChatPage  Glossary
│   ├── services/      gemini.js
│   ├── hooks/         useTheme.js  useTTS.js  useLanguage.js
│   └── data/          quizQuestions.js  journeySteps.js  glossaryTerms.js
├── .env.example
├── Dockerfile
├── nginx.conf
└── README.md
```

---

*Data sourced from the Election Commission of India (eci.gov.in). VoteWise is not affiliated with ECI or any political party.*
