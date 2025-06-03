"use client";

import { useTheme } from "next-themes";
import { ImmersiveWeatherProvider } from "@/context/immersiveWeaatherCtx";

import MainLayout from "@/components/MainLayout/MainLayout";
import ImmersiveLayout from "@/components/ImmersiveLayout/ImmersiveLayout";

export default function Home() {
  const { theme } = useTheme();

  if (theme === "immersive") {
    return (
      <ImmersiveWeatherProvider>
        <ImmersiveLayout />
      </ImmersiveWeatherProvider>
    );
  }

  return <MainLayout />;
}
