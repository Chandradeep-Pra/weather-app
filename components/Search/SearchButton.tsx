"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AppWindow, Command as CommandIco } from "lucide-react";
import React from "react";

const SearchButton = () => {
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
                <CommandInput  placeholder="Type a command or search..." />
                <ul className="px-3 pb-2 ">
                    <p className="p-2 text-sm text-muted-foreground">Suggestions</p>
                </ul>
            </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchButton;
