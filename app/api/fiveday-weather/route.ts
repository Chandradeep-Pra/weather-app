import { NextServer } from "next/dist/server/next";
import { NextResponse } from "next/server";

export async function GET(req: NextServer) {
    try{
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const lat = 23.2517399;
        const lon = 87.8667831;
        const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const response = await fetch(url,{
            next: {revalidate: 3600},
        });
        if (!response.ok) {
            throw new Error("Failed to fetch 5-day weather data");
        }

        const dailyWeatherData = await response.json();
        return NextResponse.json(dailyWeatherData, {
            status: 200,})
    }catch(e) {
    console.log("Error in fetching 5-day weather data");
    return new Response("Error in fetching 5-day weather data", {
        status: 500})
    }
}