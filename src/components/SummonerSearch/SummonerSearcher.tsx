"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Link from "next/link";
import Summoner, { SummonerProps } from "./Summoner";


interface SummonerSearcherProps {
  searchFunction: (name: string) => void;
  summoners: SummonerProps[]
  
}

const SummonerSearcher = ({ searchFunction, summoners }: SummonerSearcherProps) => {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  const searchRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="w-full relative justify-center">
      <input
        className="w-full  text-pretty bg-transparent placeholder:text-white-300 text-white  outline-none   border-opacity-30 p-2"
        type="text"
        placeholder="Type your summoner name here + tag name!"
        onChange={(e) => searchFunction(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        
        ref={searchRef}
      />
      {isSearchFocused ? (
        <Card className="bg-zinc-800 bg-opacity-40 w-full rounded-b-md  top-10 absolute transition animate-in  left-0 rounded-t-none border-zinc-800 border-t-0">
          <CardHeader className="p-4">
            <h1 className="text-white text-opacity-60">Search Results</h1>
          </CardHeader>
          <CardContent className="p-4">
              <Summoner summonerName="summonerName" tagLine="#EUW" level={30} profileIcon={1} />
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SummonerSearcher;
