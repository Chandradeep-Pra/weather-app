import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const apiKey=process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const lat = 23.2517399;
        const lon = 87.8667831;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const response = await fetch(url);
        const res = await response.json();
        // console.log(response.json());
        return NextResponse.json(res)
        
    }catch (e){
        console.log("Error fetching weather data", e);
        return new Response("Error fetching weather data", {status: 500});    
    }
}