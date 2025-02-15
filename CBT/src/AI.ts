// import { useEffect } from 'react'

import { gemini20Flash, googleAI} from '@genkit-ai/googleai'
import {genkit} from 'genkit'

const ai  = genkit ({
    plugins: [googleAI()],
    model:gemini20Flash,
})

const main = async ()=> {
   
    try{
        const {text} = await ai.generate('Hello, Genini')
        return text
        console.log(text)
    }catch(error){
        console.log(error)
        return "Error generatiing response"
    }
}

export default main 