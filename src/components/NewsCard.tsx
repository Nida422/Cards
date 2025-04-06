 "use client";

import React, { useEffect, useState } from "react";

// You can use plain HTML elements instead of shadcn if components like Card aren't available
const STATES = [
  "California", "Texas", "New York", "Florida", "Illinois", "Washington"
];

type NewsArticle = {
  title: string;
  description: string;
  url: string;
};

const NewsCard = () => {
  const [selectedState, setSelectedState] = useState("California");
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async (state: string) => {
    setLoading(true);
    try {
      // Replace with your real API key
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${state}&apiKey=6c31f69628b444a0950c7937648ee398`
      );
      const data = await response.json();
      setNews(data.articles.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch news", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedState);
  }, [selectedState]);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Top News - {selectedState}</h2>

      <label htmlFor="state-select" className="block mb-2 font-medium text-sm text-gray-700">
        Select a State
      </label>
      <select
        id="state-select"
        className="w-full p-2 border border-gray-300 rounded-md mb-6"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        {STATES.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="text-gray-500">Loading news...</p>
      ) : news.length > 0 ? (
        <ul className="space-y-4">
          {news.map((article, index) => (
            <li key={index} className="border-b pb-3">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                {article.title}
              </a>
              <p className="text-sm text-gray-600 mt-1">{article.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No news available.</p>
      )}
    </div>
  );
};

export default NewsCard;
