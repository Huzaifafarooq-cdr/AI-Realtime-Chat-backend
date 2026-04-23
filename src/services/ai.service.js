const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  static async getSuggestions(text) {
    const models = [
      "gemini-2.0-flash",
      "gemini-2.5-flash",
    ];

    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = `
Generate 3 short natural chat replies for:
"${text}"

One per line only.
`;

        const result = await model.generateContent(prompt);
        const output = result.response.text();

        const replies = output
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .slice(0, 3);

        if (replies.length) return replies;
      } catch (error) {
        console.log(`${modelName} failed: ${error.message}`);
      }
    }

    return AIService.localSuggestions(text);
  }

  static localSuggestions(text) {
    const msg = text.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
      return ["Hi 👋", "Hello!", "Hey there 😊"];
    }

    if (msg.includes("how are")) {
      return ["I'm good 😊", "Doing great!", "All good here 👍"];
    }

    if (msg.includes("thank")) {
      return ["You're welcome 😊", "Anytime!", "No problem 👍"];
    }

    return [
      "Sounds good 👍",
      "Okay, tell me more",
      "Let's do it 🚀",
    ];
  }
}

module.exports = AIService;