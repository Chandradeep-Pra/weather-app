"use client";

import { Button } from "@/components/ui/button";
import { Github, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import ThemeButton from "../Theme/ThemeButton";
import SearchButton from "../Search/SearchButton";
import { useGlobalContextUpdate } from "@/context/globalCtx";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Current position:", position);
        const { latitude, longitude } = position.coords;
        setActiveCityCoords([latitude, longitude]);
        toast.success("Live location set successfully!");
      },
      (error) => {
        toast.error("Failed to get current location");
        console.error("Geolocation error:", error);
      }
    );
  };

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left" />

      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchButton />
        <div className="btn-grp flex items-center gap-2">
          {/* New Navigate Button */}
          <Button
            onClick={handleUseMyLocation}
            variant="ghost"
            size="icon"
            className="hover:animate-pulse hover:text-blue-500 transition-all duration-200"
          >
            <Navigation size={18} />
          </Button>

          <ThemeButton />

          <Button
            className="source-code flex items-center gap-2"
            onClick={() => router.push("https://github.com/Chandradeep-Pra")}
          >
            <Github size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
