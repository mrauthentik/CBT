// import { useEffect } from 'react'

import { gemini20Flash, googleAI} from '@genkit-ai/googleai'
import {genkit} from 'genkit'


const ai  = genkit ({
    plugins: [googleAI()],
    model:gemini20Flash,
})

interface GenerateTextResponse {
    text: string;
}

// interface GenerateTextError {
//     message: string;
// }

const generateText = async (prompt: string): Promise<string> => {
    try {
        const { text }: GenerateTextResponse = await ai.generate(prompt);
        return text;
        console.log(text);
    } catch (error:unknown) {
        console.log(error);
        return "Error generating response";
    }
}

export default generateText