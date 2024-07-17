import { Summoner } from "@prisma/client";
import Link from "next/link";
import React from "react";

export interface SummonerProps {
    summonerName: string;
    tagLine: string;
    level: number;
    profileIcon: number;
}

const SummonerItem = ({name, tag, summonerLevel, profileIconId}: Summoner) => {
  return (
    <Link
      href="/summoner/summonerName"
      className="flex items-center justify-between hover:bg-zinc-800/20 h-[50px] p-4 rounded-md"
    >
      <div className="flex items-center">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${profileIconId}.png`}
          alt="profile icon"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2">
          <h1 className="text-white text-opacity-80">{name} <span className="text-sm font-medium italic">{tag}</span></h1>
          <p className="text-white text-opacity-60">Level {summonerLevel}</p>
        </div>
      </div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white text-opacity-60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
            />
        </svg>
    </Link>
  );
};

export default SummonerItem;
