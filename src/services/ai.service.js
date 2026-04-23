const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  static async getSuggestions(text) {
    const models = [
      "gemini-2.5-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro"
    ];

    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
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
          .map((line) =>
            line.replace(/^[0-9.)-]+\s*/, "").trim()
          )
          .filter(Boolean)
          .slice(0, 3);

      } catch (error) {
        console.log(`${modelName} failed:`, error.message);
      }
    }

    return [
      "Sounds good!",
      "Tell me more !",
      "Okay"
    ];
  }
}

module.exports = AIService;