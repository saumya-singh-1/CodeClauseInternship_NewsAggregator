export async function GET(request) {
  const apiKey = process.env.NEWS_API_KEY; // Remove NEXT_PUBLIC_ for server-side
  
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    
    let url;
    if (query) {
      // Search everything endpoint
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
    } else {
      // Top headlines endpoint
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category || 'general'}&apiKey=${apiKey}`;
    }

    const res = await fetch(url);

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
