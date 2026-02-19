import OpenAI from "openai";

function getClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY");
  }

  return new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });
}

const SYSTEM_PROMPT = `
You are a strict UI JSON generator.

CRITICAL RULES:
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- No HTML.
- No bootstrap.
- Do NOT invent new fields.
- Every component MUST use this structure:

{
  "type": "ComponentName",
  "props": { ... },
  "children": []
}

Allowed component types:
Button, Card, Input, Sidebar, Modal, Navbar, Chart, Table, div, span, h1, p

IMPORTANT:
- All properties must go inside "props"
- NEVER use className outside props
- NEVER use title outside props
- NEVER use label outside props
- NEVER use children outside props

Email example:
{
  "type": "Input",
  "props": { "label": "Email", "type": "email" }
}

Password example:
{
  "type": "Input",
  "props": { "label": "Password", "type": "password" }
}

Submit button example:
{
  "type": "Button",
  "props": { "children": "Login" }
}

Return EXACT format:

{
  "layout": "default | sidebar-main | centered | modal",
  "modificationType": "create",
  "components": []
}
`;



function extractJSON(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found");

  return JSON.parse(match[0]);
}

export async function generatePlan(prompt: string) {
  const client = getClient();

  const response = await client.chat.completions.create({
   model: "llama-3.1-8b-instant",
    temperature: 0.4,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
  });

  const content = response.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty AI response");
  }

  return extractJSON(content);
}
