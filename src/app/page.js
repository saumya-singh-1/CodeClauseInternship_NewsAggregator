// src/app/page.js
"use client"; // ✅ Required for using state & events in Next.js App Router

import { useState, useEffect } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(""); // search input
  const [category, setCategory] = useState("general"); // default category

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY; // ✅ use NEXT_PUBLIC_ for client-side

  // 🔹 Fetch news function
  const fetchNews = async () => {
    setLoading(true);
    try {
      const url = query
        ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

      const res = await fetch("/api/news");
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setArticles([]);
    }
    setLoading(false);
  };

  // 🔹 Load news when category or query changes
  useEffect(() => {
    fetchNews();
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">📰 My News Aggregator</h1>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Top Headlines</h2>

        {/* 🔹 Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-2 border rounded-md text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* 🔹 Categories */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["general", "business", "sports", "technology", "health", "entertainment"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setQuery(""); // clear search when category is selected
              }}
              className={`px-3 py-1 rounded-md ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* News Articles */}
        {loading ? (
          <p>Loading news...</p>
        ) : articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article, index) => (
              <article
                key={index}
                className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg flex gap-4"
              >
                {/* Article Image */}
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-32 h-20 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-32 h-20 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 rounded-md">
                    No Image
                  </div>
                )}

                {/* Article Text */}
                <div>
                  <h3 className="text-lg font-bold">{article.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {article.description || "No description available."}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mt-2 block"
                  >
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>No news found.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-center py-4 mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} My News Aggregator
        </p>
      </footer>
    </div>
  );
}
