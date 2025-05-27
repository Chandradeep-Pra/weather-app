"use client"

import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import ThemeButton from './Theme/ThemeButton';
import SearchButton from './Search/SearchButton';
import { useGlobalContext } from '@/context/globalCtx';

const Navbar = () => {
    const router = useRouter();
    // const { state } = useGlobalContext();
    // console.log(state)
  return (
    <div className='w-full py-4 flex items-center justify-between'>
        <div className="left">
        </div>
        <div className='search-container flex shrink-0 w-full gap-2 sm:w-fit'>
            <SearchButton />
            <div className="btn-grp flex items-center gap-2">
                <ThemeButton />
            <Button className='source-code flex items-center gap-2' onClick={() => router.push("https://github.com/Chandradeep-Pra")}>
                
                <Github size={15} />
            </Button>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar