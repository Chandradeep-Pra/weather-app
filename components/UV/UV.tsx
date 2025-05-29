"use client";

import { useGlobalContext } from "@/context/globalCtx";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { SunDim } from "lucide-react";
import { UvProgress } from "./UVProgress";

const UV = () => {
  const { uvData } = useGlobalContext();
  if (!uvData || !uvData.daily) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { daily } = uvData;
  const {uv_index_max } = daily;
  const maxUv = uv_index_max[0].toFixed(0);

  const uvCat = (uvData: number) => {
    if (uvData <= 2) {
      return {
        text: "Low",
        description: "Low risk of harm from unprotected sun exposure.",
      };
    } else if (uvData <= 5) {
      return {
        text: "Moderate",
        description: "Moderate risk of harm from unprotected sun exposure.",
      };
    } else if (uvData <= 7) {
      return {
        text: "High",
        description: "High risk of harm from unprotected sun exposure.",
      };
    } else if (uvData <= 10) {
      return {
        text: "Very High",
        description: "Very high risk of harm from unprotected sun exposure.",
      };
    } else {
      return {
        text: "Extreme",
        description: "Extreme risk of harm from unprotected sun exposure.",
      };
    }
  };

  const marginLeft = (maxUv / 14) * 100;

  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-xl flex flex-col gap-3 dark:bg-[#0A0A0A] shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          <SunDim size={15} /> UV Index
        </h2>
        <div className="pt-4 flex flex-col gap-1">
          <p className="text-2xl">
            {maxUv}
            <span className="text-sm">({uvCat(maxUv).text})</span>
          </p>
          <UvProgress value={marginLeft} max={14} className="progress" />
        </div>
        {/* <p className="pt-4 text-2xl">{sunsetTime}</p> */}
      </div>
      <p className="text-sm">{uvCat(maxUv).description}</p>
    </div>
  );
};

export default UV;
