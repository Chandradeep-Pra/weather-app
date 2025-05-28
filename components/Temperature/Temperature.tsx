"use client";

import { useGlobalContext } from "@/context/globalCtx";
import { kelToCel } from "@/utils/misc";
import { Cloud, CloudDrizzle, CloudRain, CloudSun, Navigation } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Temperature = () => {
  const { weatherData } = useGlobalContext();

   if (!weatherData || !weatherData.weather || !weatherData.main) {
    return <div>Loading...</div>;
  }

  const { main, timezone, name, weather } = weatherData;
  console.log(main)

  const temp = kelToCel(main?.temp);
  const minTemp = kelToCel(main?.temp_min);
  const maxTemp = kelToCel(main?.temp_max);
  const feelsLike = kelToCel(main?.feels_like);

  const [dateTime, setDateTime] = useState({
  currentDate: "",
  localTime: "",
});

const { main: weatherMain, description} = weather[0] || {};

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

// Time live
useEffect(() => {
    //Update the current  time every second
    const interval = setInterval(() => {
        const localMoment = moment().utcOffset(timezone / 60);

        // Custom format
        const formattedTime = localMoment.format("HH:mm:ss");

        //Day
        const day = localMoment.format("dddd");

        setDateTime({
            currentDate: day,
            localTime: formattedTime,
        })

    },1000)
},[])

//   console.table(main)

  
  
  return <div className="pt-6 pb-5 px-4 border rounded-xl flex-col justify-between dark:bg-[#0A0A0A]  shadow-sm dark:shadow-none ">

    <p className="flex justify-between items-center">
        <span className="font-medium">{dateTime.currentDate}</span>
        <span className="font-medium">{dateTime.localTime}</span>
    </p>
    <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span><Navigation size={12} /></span>
    </p>
    <p className="text-9xl font-bold py-10 text-center">{temp}&deg;</p>
    <div>
        <div>
            <span>{getWIcon()}</span>
            <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex gap-2">
            {/* <span>Feels like: {feelsLike}&deg;</span> */}
            <span>Low: {minTemp}&deg;</span>
            <span>High: {maxTemp}&deg;</span>
        </p>
    </div>
  </div>;
}; 

export default Temperature;
