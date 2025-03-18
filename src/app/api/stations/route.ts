import { NextResponse } from "next/server";
import { RadioBrowserApi } from "radio-browser-api";

const api = new RadioBrowserApi("radio-browser-limoeiro");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  try {
    const stations = await api.searchStations({
      countryCode: "BR",
      language: "portuguese",
      order: "votes",
      reverse: true,
      offset,
      limit: 40,
      removeDuplicates: true,
    });

    const stationsSecured = stations.filter((station) =>
      station.urlResolved.includes("https://")
    );

    return NextResponse.json(stationsSecured, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao buscar estações.", error: error.message },
      { status: 500 }
    );
  }
}
