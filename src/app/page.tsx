"use client";
import { Radio } from "@/components/radio";
import { StationList } from "@/components/stationList";
import { Station } from "radio-browser-api";
import { useEffect, useState } from "react";

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);

  const handlePlay = (station: Station) => {
    setCurrentStation(station);
  };

  const handleNext = () => {
    if (stations.length === 0) return;
    if (currentStation) {
      const index = stations.findIndex((s) => s.id === currentStation.id);
      setCurrentStation(stations[(index + 1) % stations.length]);
    } else {
      setCurrentStation(stations[0]);
    }
  };

  const handlePrevious = () => {
    if (stations.length === 0) return;
    if (currentStation) {
      const index = stations.findIndex((s) => s.id === currentStation.id);
      setCurrentStation(
        stations[(index - 1 + stations.length) % stations.length]
      );
    } else {
      setCurrentStation(stations[0]);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/stations?offset=${offset}`);

      if (!res.ok) throw new Error("Falha ao buscar estações");

      const data = await res.json();
      setStations((prev) => [...prev, ...data]);
      setOffset(offset + 10);
    } catch (error) {
      console.error("Erro ao buscar estações:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 relative">
      <h1 className="text-3xl font-bold my-4">Rádios Mais Ouvidas</h1>

      <div className="flex justify-center z-10">
        <Radio
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          station={currentStation || stations[0]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        <StationList
          stations={stations}
          onSelectStation={handlePlay}
          currentStation={currentStation || stations[0]}
        />
      </div>

      {loading && "Carregando..."}

      {!loading && stations.length > 0 && (
        <div className="flex justify-center my-4">
          <button
            onClick={fetchStations}
            disabled={loading}
            className="p-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Carregando..." : "Carregar Mais"}
          </button>
        </div>
      )}
    </div>
  );
}
