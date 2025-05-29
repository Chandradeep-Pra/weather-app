"use client";

import { useGlobalContext } from "@/context/globalCtx";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { ThermometerSun } from "lucide-react";
import { Progress } from "../ui/progress";
import {  airQualityRatings } from "@/utils/misc";

const AirPollution = () => {
  const { airData } = useGlobalContext();

  // If airData is avaialable, check if it has the required properties
  if (
    !airData ||
    !airData.list ||
    !airData.list[0] ||
    !airData.list[0].components
  ) {
    return (
      <Skeleton className="h-[12rem] w-full cols-span-2 md:col-span-full " />
    );
  }

  const aqi = airData.list[0].main.aqi*20;
  const aqiRating = airQualityRatings.find((item) => {
    return item.rating === aqi
})
  return (
    <div className="air-pollution col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 pt-6 px-4 h-[12rem] border rounded-xl flex flex-col gap-4 dark:bg-[#0A0A0A] shadow-sm dark:shadow-none ">
      <h2 className="flex items-center gap-2 font-medium">
        {" "}
        <ThermometerSun size={15} /> Air Pollution{" "}
      </h2>
      <Progress
        value={aqi} 
        max={100}
        className="progress"
      />
      <span className="flex flex-col gap-1">
        <p>Air quality is {aqiRating?.label}</p>
      <p className="text-sm text-neutral-700 dark:text-neutral-400"> - {aqiRating?.description} </p>
      </span>
      
    </div>
  );
};

export default AirPollution;
