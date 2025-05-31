import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try{
        const searchParams = req.nextUrl.searchParams;
        const city = searchParams.get("search")
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey}`;


        const res = await fetch(url);
        const data = await res.json();
        // console.log(await res.json())
        return NextResponse.json(data);
    }catch (error) {
        console.error("Error fetching geo-coordinates:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}