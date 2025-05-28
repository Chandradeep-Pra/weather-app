"use client";

import { useGlobalContext } from "@/context/globalCtx";
import { kelToCel } from "@/utils/misc";
import {
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSun,
  Navigation,
} from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const Temperature = () => {
  const { weatherData } = useGlobalContext();

  const [currentDate, setCurrentDate] = useState("");
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    if (!weatherData?.timezone) return;

    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(weatherData.timezone / 60);
      const formattedTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");

      setCurrentDate(day);
      setLocalTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [weatherData?.timezone]);

  if (!weatherData || !weatherData.weather || !weatherData.main) {
    return <Skeleton className="w-full h-[12rem]" />;
  }

  const { main, timezone, name, weather } = weatherData;

  const temp = kelToCel(main?.temp);
  const minTemp = kelToCel(main?.temp_min);
  const maxTemp = kelToCel(main?.temp_max);
  const feelsLike = kelToCel(main?.feels_like);

  const { main: weatherMain, description } = weather[0] || {};

  const getWIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return <CloudDrizzle size={18} />;
      case "Rain":
        return <CloudRain size={18} />;
      case "Clouds":
        return <Cloud size={18} />;
      case "Clear":
      default:
        return <CloudSun size={18} />;
    }
  };

  return (
    <div className="pt-6 pb-5 px-4 border rounded-xl flex-col justify-between dark:bg-[#0A0A0A] shadow-sm dark:shadow-none">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDate}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>
          <Navigation size={12} />
        </span>
      </p>
      <p className="text-9xl font-bold py-10 text-center">{temp}&deg;</p>
      <div>
        <div>
          <span>{getWIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex gap-2">
          <span>Low: {minTemp}&deg;</span>
          <span>High: {maxTemp}&deg;</span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;



