import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const lat = 23.2517399;
        const lon = 87.8667831;
        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch air pollution data");
        }
        const res = await response.json();
        // console.log(res)
        return  NextResponse.json(res);
    } catch (e) {
        console.error("Error fetching air pollution data", e);
        return new Response("Error fetching air pollution data", { status: 500 });
    }

}