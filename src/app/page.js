// src/app/page.js
"use client"; // ✅ Required for using state & events in Next.js App Router

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(""); // search input
  const [category, setCategory] = useState("general"); // default category

  // 🔹 Fetch news function
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (query) {
        params.append('q', query);
      } else {
        params.append('category', category);
      }
      
      const res = await fetch(`/api/news?${params.toString()}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err.message);
      setArticles([]);
    }
    setLoading(false);
  }, [query, category]);

  // 🔹 Load news when category or query changes
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchNews();
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setQuery(""); // clear search when category is selected
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
            disabled={!query.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </form>

        {/* 🔹 Categories */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["general", "business", "sports", "technology", "health", "entertainment"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 rounded-md transition-colors ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* News Articles */}
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading news...</span>
          </div>
        ) : articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article, index) => (
              <article
                key={`${article.url || index}`}
                className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg flex gap-4 hover:shadow-lg transition-shadow"
              >
                {/* Article Image */}
                {article.urlToImage ? (
                  <Image
                    src={article.urlToImage}
                    alt={article.title || "News article"}
                    width={128}
                    height={80}
                    className="w-32 h-20 object-cover rounded-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-32 h-20 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 rounded-md">
                  No Image
                </div>

                {/* Article Text */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{article.title || "No title available"}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {article.description || "No description available."}
                  </p>
                  {article.url && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline mt-2 block inline-block"
                    >
                      Read more →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : !error ? (
          <div className="text-center py-8 text-gray-500">
            <p>No news found for &quot;{query || category}&quot;.</p>
            <p className="text-sm mt-2">Try a different search term or category.</p>
          </div>
        ) : null}
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
