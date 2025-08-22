export async function GET(request) {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
        status: res.status,
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
