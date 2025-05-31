"use client";

import { useGlobalContext } from "@/context/globalCtx";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { unixToTime } from "@/utils/misc";
import { SunsetIcon } from "lucide-react";

const Sunset = () => {
  const { weatherData } = useGlobalContext();

  if (!weatherData || !weatherData.sys || !weatherData.sys.sunset) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  //   const sunriseTime = weatherData?.sys.surise;
  const times = weatherData?.sys;
  const timezone = weatherData?.timezone;

  const sunsetTime = unixToTime(times.sunset, timezone);
  const sunriseTime = unixToTime(times.sunrise, timezone);
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-xl flex flex-col gap-4 dark:bg-[#0A0A0A] shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          <SunsetIcon size={15} /> Sunset
        </h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>
      <p>Sunsrise : {sunriseTime}</p>
      {/* Sunset at  */}
      {/* Sunrise at {sunriseTime} */}
    </div>
  );
};

export default Sunset;
