"use client"
export const fetchCryptoNews = async () => {
  const res = await fetch('https://newsdata.io/api/1/news?apikey=YOUR_KEY&category=technology&q=crypto');
  return res.json();
};