"use client"

export default function CryptoDetail({ params }: { params: { id: string } }) {
  return <div className="p-4">Details for {params.id}</div>;
}