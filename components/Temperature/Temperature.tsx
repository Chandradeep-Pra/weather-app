"use client";

import { useGlobalContext } from "@/context/globalCtx";
import { kelToCel } from "@/utils/misc";
import { Cloud, CloudDrizzle, CloudRain, CloudSun } from "lucide-react";
import React, { useState } from "react";

const Temperature = () => {
  const { weatherData } = useGlobalContext();
  const { main, timezone, name, weather } = weatherData;

  const temp = kelToCel(main?.temp);
  const minTemp = kelToCel(main?.temp_min);
  const maxTemp = kelToCel(main?.temp_max);
  const feelsLike = kelToCel(main?.feels_like);

  const [dateTime, setDateTime] = useState({
  currentDate: "",
  localTime: "",
});

// const { main: weatherMain, description} = weather[0];
console.log(weather);

const getWIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return <CloudDrizzle size={18} />
      case "Rain":
        return <CloudRain size={18} />
      case "Clouds":
        return <Cloud size={18} />
      case "Clear":
        return <CloudSun size={18} />
      default:
        return <CloudSun size={18} />
} }

  console.table(main)

  if(!weatherData || !weather ) return <div>Loading...</div>
  
  return <div className="pt-6 pb-5 border rounded-xl flex-col justify-between dark:bg-[#0A0A0A]  shadow-sm dark:shadow-none ">

    <p className="flex justify-between items-center">
        <span className="font-medium">{dateTime.currentDate}</span>
        <span className="font-medium">{dateTime.localTime}</span>
    </p>
  </div>;
}; 

export default Temperature;
