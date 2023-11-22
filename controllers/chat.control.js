import openai from "../config/openAI.js";
import readline from "readline";
import colors from "colors";



let conversationHistory = [];

export default class chatController {
  static async chat(req, res) {

    const userInput = req.body.userInput;

    if (!userInput) {
      return res.status(400).json({ error: 'Missing userInput parameter.' });
    }
  
    try {
      conversationHistory.push({ role: 'user', content: userInput });
  
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: conversationHistory,
      });
  
      const response = chatCompletion.choices[0].message.content;
      conversationHistory.push({ role: 'assistant', content: response });
  
      res.json({ response });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }

  }
}
