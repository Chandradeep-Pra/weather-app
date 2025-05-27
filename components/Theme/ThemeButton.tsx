"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {theme === "dark" ? (
            <MoonIcon size={15} className="rotate-0 scale-100" />
          ) : (
            <SunIcon size={15} className="rotate-0 scale-100" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {[
          {
            themeName: "light",
            themIco: <SunIcon size={15} />,
          },
          { themeName: "dark", themIco: <MoonIcon size={15} /> },
        ].map((t, i) => (
          <DropdownMenuItem
            onClick={() => {
              setTheme(t.themeName);
            }}
            key={i}
          >
            <div className="flex gap-2 items-center">
              {t.themIco} <span>{t.themeName}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeButton;
