import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getPredictionSuggestion = async () => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'Come up with a creative, one sentence long prediction for something that could happen in the future (avoid the space travel topic and sensitive topics like health issues). This will be used as placeholder text in an HTML input element, so no extra fluff in your reply. E.G: "New Zealand will win the next rugby world cup',
        },
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 32,
    });
    return completion.choices[0].message;
  } catch (error) {
    throw new Error('Error in getPredictionSuggestion');
  }
};

export { getPredictionSuggestion };
