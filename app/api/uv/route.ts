import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat") || "22.5726";
    const lon = searchParams.get("lon") || "88.3639";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (e) {
    console.log("Error in fetching UV data");
    return new Response("Error in fetching UV data", {
      status: 500,
    });
  }
}
