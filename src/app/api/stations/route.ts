// app/api/stations/route.ts (ou .js)
import { NextRequest, NextResponse } from "next/server";
import { RadioBrowserApi } from "radio-browser-api";

const api = new RadioBrowserApi("radio-browser-limoeiro");

// Método GET para buscar dados
export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const stations = await api.searchStations({
    countryCode: "BR",
    language: "portuguese",
    order: "votes",
    reverse: true,
    offset,
    limit: 10,
    removeDuplicates: true,
  });

  return NextResponse.json(stations);
}
