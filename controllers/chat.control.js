import openai from "../config/openAI.js";
import readline from "readline";
import colors from "colors";
import User from "../models/user.models.js";



export default class chatController {
  static async chat(req, res) {
    const userInput = req.body.userInput;
    const userId = req.user._id;

    if (!userInput) {
      return res.status(400).json({ error: 'Missing userInput parameter.' });
    }

    try {
      const user = await User.findById(userId);

      // Update user's chat history
      const cleanedHistory = user.chatHistory.map(({ role, content }) => ({ role, content }));

      cleanedHistory.push({ role: 'user', content: userInput });

      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: cleanedHistory,
      });

      const response = chatCompletion.choices[0].message.content;
      cleanedHistory.push({ role: 'assistant', content: response });

      // Save the updated chat history to the user
      user.chatHistory = cleanedHistory;
      await user.save();

      res.json({ response });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }



// get chat history
  static async getChatHistory(req, res) {
    const userId = req.user._id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const chatHistory = user.chatHistory;
      res.json({ chatHistory });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}