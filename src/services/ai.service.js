const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fallbackReplies = (text) => [
  "Sounds good 👍",
  "I understand.",
  `Replying to: ${text.slice(0, 20)}...`
];

const getSuggestions = async (text) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
Generate 3 short human chat replies for:
"${text}"

Only replies, one per line.
`;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    const replies = output
      .split("\n")
      .map((line) => line.replace(/^[0-9.)-]+\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 3);

    return replies.length ? replies : fallbackReplies(text);

  } catch (error) {
    console.error("Gemini Error:", error.message);
    return fallbackReplies(text);
  }
};

module.exports = { getSuggestions };