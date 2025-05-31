"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGlobalContext, useGlobalContextUpdate } from "@/context/globalCtx";
import { Command as CommandIco } from "lucide-react";
import React, { useState } from "react";

const SearchButton = () => {
  const { geoCoords, inputVal, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredItem, setHoveredItem] = useState<number>(0);
  const getCityCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };
  return (
    <div className="serch-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium"
          >
            <p className="text-sm text-muted-foreground">Search your city...</p>
            <div className="command py-[2px] flex items-center dark:bg-[#262626] bg-slate-200 pl-[5px] pr-[7px] rounded-sm ml-[10rem] gap-2">
              <CommandIco size={6} />
              <span className="text-[9px]">K</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0">
          <Command className="rounded-lg border shadow-md p-4">
            <CommandInput
              placeholder="Type a command or search..."
              value={inputVal}
              onChangeCapture={handleInput}
            />
            <ul className="px-3 pb-2 ">
              <p className="p-2 text-sm text-muted-foreground">Suggestions</p>
              {geoCoords.length === 0 ||
                (!geoCoords && <p>No geo location data available</p>)}
              {geoCoords &&
                geoCoords.map(
                  (
                    city: {
                      name: string;
                      country: string;
                      state: string;
                      lat: number;
                      lon: number;
                    },
                    i: number
                  ) => {
                    const { country, state, name } = city;
                    return (
                      <li
                        key={i}
                        className={`py-3 px-2 text-sm cursor-default rounded-md hover:bg-accent ${
                          hoveredItem === i ? "bg-accent" : ""
                        }`}
                        onClick={() => getCityCoords(city.lat, city.lon)}
                        onMouseEnter={() => setHoveredItem(i)}
                        // onMouseLeave={() => setHoveredItem(0)}
                      >
                        <p className="text">
                          {name}, {state && state + ","} {country}
                        </p>
                      </li>
                    );
                  }
                )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchButton;
