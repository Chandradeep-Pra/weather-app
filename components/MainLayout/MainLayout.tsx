"use client";

import { useGlobalContextUpdate } from "@/context/globalCtx";
import { useTheme } from "next-themes";
import React from "react";
import Navbar from "../Navbars/Navbar";
import Temperature from "../Temperature/Temperature";
import FiveDayWeather from "../FiveDayWeather/FiveDayWeather";
import AirPollution from "../AirPollution/AirPollution";
import Sunset from "../Sunset/Sunset";
import Wind from "../Wind/Wind";
import DailyWeather from "../DailyWeather/DailyWeather";
import UV from "../UV/UV";
import Poppulation from "../Population/Poppulation";
import FeelsLike from "../FeelsLike/FeelsLike";
import Humidity from "../Humidity/Humidity";
import Visibility from "../Visibility/Visibility";
import Pressure from "../Pressure/Pressure";
import TheMap from "../TheMap/TheMap";
import topCities from "@/utils/topCities";

const MainLayout = () => {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const { theme } = useTheme();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

  };
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayWeather />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2  lg:grid-cols-3 xl-grid-cols-4">
            <AirPollution />
            {/* <AirPollution /> */}
            <Sunset />
            <Wind />
            <DailyWeather />
            <UV />
            <Poppulation />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="map-con mt-4 flex gap-4">
            <TheMap />
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Top Cities
              </h2>
              <div className="flex flex-col gap-4">
                {topCities.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                      onClick={() => {
                        getClickedCityCords(state.lat, state.lon);
                      }}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
