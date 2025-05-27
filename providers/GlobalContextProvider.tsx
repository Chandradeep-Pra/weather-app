"use client";

import { GlobalContextProvider } from "@/context/globalCtx"
import React from "react";

export function ContextProvider({ children }:{children: React.ReactNode}){

    return(
        <GlobalContextProvider>{children}</GlobalContextProvider>
    )
}