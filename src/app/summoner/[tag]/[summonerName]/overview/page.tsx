"use server";
import ChampionStatBoard from "@/components/Champion/ChampionStatBoard";
import MatchPanel from "@/components/Match/MatchPanel";
import SummonerNotFound from "@/components/Summoner/SummonerNotFound";
import SummonerRank from "@/components/Summoner/SummonerRank";
import { getChampions } from "@/lib/champions";
import { useQuery } from '@tanstack/react-query'
import { Match, getMatches } from "@/utils/matches";
import { getSummonerByName } from "@/utils/summoner";
import { League, Summoner } from "@prisma/client";

import React from "react";

interface SummonerPageProps {
  params: {
    tag: string;
    summonerName: string;
  };
}





const SummonerPage = async ({ params }: SummonerPageProps) => {

  const summoner = await getSummonerByName({
    server: "euw1",
    summonerName: decodeURIComponent(params.summonerName),
    tag: decodeURIComponent(params.tag),
  });
  

  const champions = await getChampions();
  const matches = await getMatches(summoner.summonerData?.puuid!, 25);
  
  if (summoner.status !== 200) {
    return (
      <SummonerNotFound
        summonerName={decodeURIComponent(params.summonerName)}
        tag={params.tag}
        server="euw1"
      />
    );
  }
  
  function getSummonerAsParticipant(match: Match) {
    return match.info.participants.find((item) => item.puuid == summoner.summonerData?.puuid)
  };

    return (
      <div className="flex flex-col xl:flex-row gap-[8px]  font-inter">
          <div className="w-full xl:w-1/3 space-y-2" >
            {summoner.summonerData?.leagues.map((league: League) => {
              return <SummonerRank key={league.queueType} {...league} />;
            })}
            <ChampionStatBoard matches={matches} summoner={summoner.summonerData!} champions={champions} />
          </div>
          <div className="w-full xl:w-3/4">
            <MatchPanel 
              matches={matches}
              champions={champions}
              summonerId={summoner.summonerData?.puuid!}
            />
          </div>
      </div>
    );
 
};

export default SummonerPage;
