const { googleAI } = require("@genkit-ai/googleai");
const { genkit } = require("genkit");
const functions = require("firebase-functions");

// Initialize Genkit
const ai = genkit({
  plugins: [googleAI({ models: ["gemini-1.0-flash"] })], // Ensure the model is correct
});

// Create an API endpoint
export default generateAIText = functions.https.onRequest(async (req, res) => {
  try {
    const { text } = await ai.generate("Hello, Gemini!");
    res.json({ response: text });
    console.log(text)
  } catch (error) {
    console.error("Genkit AI Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});
