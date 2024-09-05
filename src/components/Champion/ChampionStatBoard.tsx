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
import {ChampionStatFooter, ChampionStatInfoCard, ChampionStatInfoHeader} from "@/components/Champion/ChampionStatInfo";
import ChampionStat from "@/components/Champion/ChampionStat";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import "./Statistics.css"
import { Summoner } from "@prisma/client";
interface ChampionStatBoardProps {
  matches: Match[];
  summoner: Summoner;
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
  summoner,
    champions
}: ChampionStatBoardProps) => {
  
  
  const groupsStat = calculateChampionStats(groupByChampions(matches, summoner.puuid), champions);

    function compareFunction(a: string, b: string) {
        const aWinrate = groupsStat[a].gamesNumber;
        const bWinrate = groupsStat[b].gamesNumber;
        if(aWinrate < bWinrate) {
            return 1;
        }
        return -1;
    }

  return (
   <ChampionStatInfoCard className={"min-w-full "}>
       <ChampionStatInfoHeader className={"border-b border-[#0E0B0D]"}>
           Champion Statistics
       </ChampionStatInfoHeader>
       <div className="pt-1 ">
           {Object.keys(groupsStat).slice(0, 5).sort(compareFunction).map((group) => {
               return <ChampionStat key={group} {...groupsStat[group]} />
           })}

       </div>

           <ChampionStatFooter
               href={`/summoner/${summoner.tag}/${summoner.name}/champion-stats`}
               className={"text-sm text-opacity-20 hover:text-opacity-50"}
           >
               <p className={"flex items-center justify-center"}>Click here to see more information <ArrowRight size={'18px'} /></p>
           </ChampionStatFooter>

   </ChampionStatInfoCard>
  );
};

export default ChampionStatBoard;
