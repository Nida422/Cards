'use client'
import { useState } from 'react'

export default function Header({ setActive }: { setActive: (tab: string) => void }) {
  return (
    <header className="flex justify-center gap-6 p-4 bg-gray-900 text-white text-lg font-semibold">
      <button className='shadow-lg' onClick={() => setActive('weather')}>Weather Card</button>
      <button className='shadow-lg' onClick={() => setActive('crypto')}>Crypto Card</button>
      <button className='shadow-lg' onClick={() => setActive('news')}>News Card</button>
    </header>
  )
}
