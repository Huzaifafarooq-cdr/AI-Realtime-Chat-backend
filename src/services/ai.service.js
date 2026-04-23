const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  static async getSuggestions(text) {
    const models = [
      "gemini-2.0-flash",
      "gemini-2.5-flash"
    ];

    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
        });

        const prompt = `
Generate 3 short natural casual chat replies for:
"${text}"

Rules:
- Keep replies short
- Human sounding
- Friendly tone
- One reply per line
- No numbering
`;

        const result = await model.generateContent(prompt);
        const output = result.response.text();

        const suggestions = output
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) =>
            line.replace(/^[0-9.)-]+\s*/, "")
          )
          .slice(0, 3);

        if (suggestions.length > 0) {
          return suggestions;
        }
      } catch (error) {
        console.log(`${modelName} failed:`, error.message);
      }
    }

    return [
      "Sounds good to me",
      "Okay, tell me more",
      "Let's do it ",
    ];
  }
}

module.exports = AIService;