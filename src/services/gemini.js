import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `
You are VoteBot, an election education assistant for Indian citizens.
Your ONLY purpose is explaining the Indian election process.

Always respond in the SAME LANGUAGE the user writes in.
Keep answers under 120 words unless user asks for detail.
Be completely politically neutral - never mention any party or candidate.
Always encourage civic participation.

Topics you cover ONLY:
- Voter registration and Voter ID (EPIC card)
- Lok Sabha, Rajya Sabha, State, Panchayat elections
- Voting day process and polling booth procedure
- EVM machines and VVPAT
- Election Commission of India
- NOTA option and ballot secrecy
- Candidate eligibility and nomination
- Vote counting and result declaration
- Reserved constituencies and delimitation
- Voter rights and Model Code of Conduct

If asked anything else, say:
"I'm focused on election education! Ask me about voting,
the election process, or your rights as a voter."

Format: Start with direct answer, then 2-3 bullets if needed.
`;

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const client = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function askVoteBot(message, history = []) {
  if (!client) {
    console.error('[VoteBot]: Client not initialized. Check VITE_GEMINI_API_KEY.');
    return "Sorry, I couldn't connect. Please check your API configuration.";
  }

  try {
    const model = client.getGenerativeModel({
      model: 'gemini-flash-latest',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error('[VoteBot Error]:', error);
    return "Sorry, I couldn't connect. Please try again.";
  }
}
