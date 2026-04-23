const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getSuggestions = async (text) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Generate 3 short casual chat replies for:
"${text}"

Only replies, one per line.
`;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    return output
      .split("\n")
      .map((line) => line.replace(/^[0-9.)-]+\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 3);

  } catch (error) {
    console.error("Gemini Error:", error.message);
    return ["AI unavailable right now"];
  }
};

module.exports = { getSuggestions };