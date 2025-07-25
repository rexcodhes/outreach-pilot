import * as dotenv from 'dotenv'
import { readFile } from 'fs/promises';
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from 'ai';
import {writeMarkdownFile} from "./writeFile"

dotenv.config({ path: './src/.env' });

const gemini_key = process.env.GEMINI_API_KEY;
async function generateSummary(){
    const google = createGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY
    })
    
const result = await generateText({
  model: google('gemini-1.5-flash'),
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'What does this pdf mean?',
        },
        {
          type: 'file',
          data: await readFile('./cv/resume.pdf'),
          mimeType: 'application/pdf',
        },
      ],
    },
  ],
})
const response = result.text
console.log(result.text)
writeMarkdownFile("lol.md", response)

};

generateSummary()