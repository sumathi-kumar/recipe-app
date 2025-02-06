import OpenAI from "openai"
import { OpenAIStream, StreamingTextResponse } from "ai"

export const runtime = "edge"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are a professional chef who creates recipes. When given ingredients, create a recipe with the following format:
    
[Recipe Name]
With [complementary ingredients or cooking style]

- List all ingredients with measurements
- Include any additional basic ingredients needed (salt, pepper, oil, etc)

Instructions:
1. Write clear, numbered steps
2. Include cooking temperatures and times
3. Add helpful tips where necessary

Keep the recipe practical and easy to follow. Ensure all ingredients are used.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    console.error("API Error:", error)
    return new Response(JSON.stringify({ error: error.message || "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

