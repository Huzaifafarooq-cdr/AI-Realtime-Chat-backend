const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getSuggestions = async (text) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest"
    });

    const prompt = `
You are a smart chat assistant.
Generate 3 short reply suggestions for this message:

"${text}"

Keep them casual and human.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Convert text → array
    const suggestions = response
      .split("\n")
      .filter((line) => line.trim() !== "");

    return suggestions.slice(0, 3);

  } catch (error) {
    console.error(" Gemini Error:", error.message);
    return ["Sorry, AI failed 😅"];
  }
};

module.exports = { getSuggestions };