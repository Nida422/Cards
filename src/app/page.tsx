 'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import WeatherCard from '@/components/weatherCard'
import CryptoCard from '@/components/CryptoCard'
import NewsCard from '@/components/NewsCard'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('weather')

  return (
    <div>
      <Header setActive={setActiveTab} />
      <div className="p-4 transition-all ease-in-out duration-500">
        {activeTab === 'weather' && <WeatherCard />}
        {activeTab === 'crypto' && <CryptoCard />}
        {activeTab === 'news' && <NewsCard />}
      </div>
    </div>
  )
}
