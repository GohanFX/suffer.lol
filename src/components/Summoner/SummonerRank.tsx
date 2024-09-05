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
    <div className=" min-h-[95px] px-2 py-3 border border-zinc-800/60 rounded-md p-2 bg-panels/75 transition-colors ">
      <div className="flex flex-row space-x-2 items-center">
        <Image src={ranks[tier]} alt={rank} className={"h-[75px] w-[75px]"} />

        <div className="w-full h-full leading-[0px]">
          <h1 className="text-[14px] leading-3 font-semibold text-white/80">
            {transformRank(queueType).toUpperCase()}
          </h1>
          <h2 className="text-[12px] leading-3 text-white/80 pb-[16px] font-medium"><span style={
            {
              color: getRankColor(tier)
            }
          }>{tier}</span> {rank}</h2>
          <div className="flex justify-between items-center w-full">
            <div className="text-[12px] text-opacity-35">
              <p className="text-white/40 leading-none">
                W: <span className={"text-white font-medium"}>{wins}</span> L: <span className={"text-white font-medium"}>{losses}</span>
              </p>
              <p className="text-white/40 leading-none">LP: <span className={"text-white font-medium"}>{leaguePoints}</span></p>
            </div>
            <p className="text-white/40 leading-none text-[12px] text-right">
              Winrate: <span className={"font-semibold text-white mr-2"}>{(((wins) / (wins + losses)) * 100).toFixed(2)}%</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

function getRankColor(tier: string) {
    console.log(tier)
    switch (tier) {
      case "IRON":
        return "#371815";
      case "BRONZE":
        return "#613d2a";
      case "SILVER":
        return "#979797";
      case "GOLD":
        return "#ba863e"
      case "PLATINUM":
        return "#36bc86"
      case "EMERALD":
        return "#009e37"
      case "DIAMOND":
        return "#0060a8";
      case "MASTER":
        return "#9100d6";
      case "GRANDMASTER":
        return "#d60027";
      case "CHALLENGER":
        return "#d70027";
      default:
        return "#dddddd";
    }
}


export default SummonerRank;
