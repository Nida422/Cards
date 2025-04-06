"use client";

export default function WeatherDetail({ params }: { params: { city: string } }) {
  return <div className="p-4">Weather details for {params.city}</div>;
}
