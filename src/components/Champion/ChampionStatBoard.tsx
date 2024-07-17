import Image from "next/image";
import React from "react";

import { ChampionDTO } from "@/lib/champions";
import {
    calculateChampionStats,
    getSummonerAsParticipant,
    groupByChampions,
    Match,
    MatchParticipant
} from "@/utils/matches";
import { Summoner } from "@prisma/client";
interface ChampionStatBoardProps {
  matches: Match[];
  summonerPuuid: string;
  champions: ChampionDTO;
}

export interface ChampionGames {
  summonerPuuid: string,
  champions: {
    [key: string]: Match[];
  }

}

function transformNumber(numberToTransform: number) {
    return numberToTransform.toFixed(1);
}

const ChampionStatBoard = ({
  matches,
  summonerPuuid,
  champions,
}: ChampionStatBoardProps) => {
  const groupsStat = calculateChampionStats(groupByChampions(matches, summonerPuuid));
    console.log(groupsStat)

  return (
    <div className="min-w-[270px]  border border-zinc-800/60 rounded-sm bg-panels/75 transition-colors ">
        <div className="w-full border-b border-b-zinc-800 p-3">
            <h1 className={'font-semibold text-lg text-white ml-0'}>Champion Statistics</h1>
        </div>
      <div className="flex flex-col p-2 gap-[8px]">
          {Object.keys(groupsStat).map((key: string) => {
              const champion = groupsStat[key];
              return (<div key={key} className={"flex w-full gap-2 "}>
                  <Image src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${
                      champions.data[key].image.full
                  }`}
                         alt={""}
                         width={35}
                         height={35}
                         className={"rounded-md"}
                  />
                  <div className="flex flex-wrap items-center justify-between">
                            <p>{transformNumber(champion.kills / champion.gamesNumber)}/{transformNumber(champion.deaths / champion.gamesNumber)}/{transformNumber(champion.assists / champion.gamesNumber)}</p>
                  </div>
              </div>)
          })}
      </div>
    </div>
  );
};

export default ChampionStatBoard;
