import { Station } from "radio-browser-api";
import React from "react";
import { AudioPlayer } from "./audioPlayer";

interface StationListProps {
  stations: Station[];
  onSelectStation: (station: Station) => void;
  currentStation: Station | null;
}

export function StationList({
  stations,
  onSelectStation,
  currentStation,
}: StationListProps) {
  return (
    <>
      {stations.map((station) => {
        const isSelected = currentStation?.id === station.id;

        return (
          <div
            key={`${station.id}_${station.clickCount}`}
            className={`border rounded-lg p-4 flex flex-col justify-between gap-2 transition-opacity duration-300 hover:opacity-40 cursor-pointer ${
              isSelected ? "opacity-40 scale-95" : " opacity-100"
            }`}
            onClick={() => onSelectStation(station)}
          >
            <img
              src={station.favicon || "/radio.svg"}
              alt="Radio favicon"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h1 className="text-lg font-semibold">{station.name}</h1>
              <h2 className="">Votos: {station.votes}</h2>
            </div>
          </div>
        );
      })}
    </>
  );
}
