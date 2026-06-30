export const runtime = "edge";
export const maxDuration = 60;

export async function POST(req) {
  try {
    const { messages, useSearch } = await req.json();
    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: "missing ANTHROPIC_API_KEY", content: [] }, { status: 500 });
    }
    const body = { model: "claude-sonnet-4-6", max_tokens: 1000, messages };
    if (useSearch) body.tools = [{ type: "web_search_20250305", name: "web_search" }];
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: String(e), content: [] }, { status: 500 });
  }
}
