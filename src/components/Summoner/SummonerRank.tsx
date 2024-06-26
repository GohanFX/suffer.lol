import { League } from "@prisma/client";
import React from "react";
import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { ranks, transformRank } from "@/utils/ranks";

const SummonerRank = ({
  id,
  queueType,
  tier,
  rank,
  summonerId,
  leagueId,
  wins,
  losses,
  leaguePoints,
  hotStreak,
  veteran,
  freshBlood,
  inactive,
}: League) => {
  return (
    <div className="min-w-[270px]  mt-2 mx-2 border border-zinc-800/60 rounded-md p-2 bg-zinc-800/30 transition-colors hover:bg-zinc-800/50">
      <div className="flex flex-row space-x-2 items-center">
        <Image src={ranks[tier]} alt={rank} height={75} width={75} />

        <div className=" leading-[0px]">
          <h1 className="text-lg leading-none font-semibold text-white/80">
            {transformRank(queueType).toUpperCase()}
          </h1>
          <h2 className="text-sm text-white/80 pb-[8px] font-medium">{`${tier} ${rank}`}</h2>
          <div className="text-[12px] text-opacity-35">
            <p className="text-white/40 leading-none">
              W: {wins} L: {losses}
            </p>
            <p className="text-white/40 leading-none">LP: {leaguePoints}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummonerRank;
