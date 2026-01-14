import axios from 'axios';

export async function getBotResponse(userMessage: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4.1-nano',
        messages: [
          {
            role: 'user',
            content: userMessage,
          }]
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );
    const responseText = response.data.choices[0].message.content;
    return responseText
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'Sorry, I couldn\'t get a response from the server.';
  }
}
