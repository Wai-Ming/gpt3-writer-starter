import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Backticks used here (i.e. template literals) as want new lines in prompt
const basePromptPrefix = 
`
Write me a dish name by a professional chef for something healthy I can make with the following ingredients. If I am missing any ingredients, let me know what ingredients I am missing to make the dish: 
`;
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
  
    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
    //   Added \n here so GPT-3 starts on new line and not on same where might try to autocomplete prompt unless this is desired.
      prompt: `${basePromptPrefix}${req.body.userInput}\n`,
      temperature: 0.7,
    //   normally 250 tokens, more tokens for longer post but larger cost depending on prompt
      max_tokens: 50,
    });
    
    const basePromptOutput = baseCompletion.data.choices.pop();
  
    res.status(200).json({ output: basePromptOutput });
  };
  
  export default generateAction;