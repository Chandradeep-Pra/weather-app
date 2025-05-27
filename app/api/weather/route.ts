import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    try{
        const apiKey=process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const lat = 40.3442;
        const lon = -5.3565;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        
    }catch (e){
        console.log("Error fetching weather data", e);
        return new Response("Error fetching weather data", {status: 500});    
    }
}