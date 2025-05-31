"use client";
//@ts-nocheck

import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/context/globalCtx";

type FlyToActiveCityProps = {
  activeCityCords: {
    lat: number;
    lon: number; // or rename to lng in the parent itself
  };
};

function FlyToActiveCity({ activeCityCords }:FlyToActiveCityProps) {
  const map = useMap();
    // console.log("activeCityCords", activeCityCords);
    useEffect(() => {
      if (activeCityCords) {
        const zoomLev = 13;
        const flyToOptions = {
          duration: 1.5,
        };

        map.flyTo(
          [activeCityCords.lat, activeCityCords.lon],
          zoomLev,
          flyToOptions
        );
      }
    }, [activeCityCords, map]);

    return null;
}

const TheMap = () => {
  // const lat = 23.2517399;
  // const lon = 87.8667831;
  const { weatherData } = useGlobalContext();
  const activeCityCords = weatherData?.coord;

  if (!weatherData || !weatherData.coord || !activeCityCords) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <div className="flex-1 basis-[50%] border  rounded-xl h-[24rem] p-4">
      <MapContainer
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "calc(100%-2rem)", height: "calc(100%-2rem)" }}
        className="rounded-xl w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
};

export default TheMap;
