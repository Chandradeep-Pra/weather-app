"use client";

import { useGlobalContext } from "@/context/globalCtx";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { WindIcon } from "lucide-react";
import Image from "next/image";

const Wind = () => {
  const { weatherData } = useGlobalContext();

  const windSpeed = weatherData?.wind?.speed;
  const windDir = weatherData?.wind?.deg;

  if (!windSpeed || !windDir) {
    return <Skeleton className="h-[12rem] w-full" />;
  }
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-xl flex flex-col gap-3 dark:bg-[#0A0A0A] shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          <WindIcon size={15} /> Wind
        </h2>
        <div className="compass relative flex items-center justify-center">
          <div className="relative image">
            <Image
              src="./compass_body.svg"
              alt="compass"
              width={110}
              height={110}
            />
            <Image
              src="./compass_arrow.svg"
              alt="arrow"
              width={11}
              height={11}
              className="absolute top-0 left-[45%] transition-all duration-500 ease-in-out dark:invert"
              style={{
                transform: `rotate(${windDir}deg) translateX(-50%)`,
                height: "100%",
              }}
            />
          </div>
        <p className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xs dark:text-white font-medium">{Math.round(windSpeed)} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default Wind;
