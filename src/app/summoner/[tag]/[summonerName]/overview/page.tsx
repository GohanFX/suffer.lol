import ChampionStatBoard from "@/components/Champion/ChampionStatBoard";
import MatchItem from "@/components/Match/MatchItem";
import ProfileNavigation from "@/components/Navigation/ProfileNavigation";
import SummonerNotFound from "@/components/Summoner/SummonerNotFound";
import SummonerRank from "@/components/Summoner/SummonerRank";
import { Button } from "@/components/ui/button";
import { getChampions } from "@/lib/champions";
import { getRandomBackground } from "@/utils";
import { Match, getMatches } from "@/utils/matches";
import { getSummonerByName } from "@/utils/summoner";
import { League } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SummonerPageProps {
  params: {
    tag: string;
    summonerName: string;
  };
}



const SummonerPage = async ({ params }: SummonerPageProps) => {
  const summoner = await getSummonerByName(
    "euw1",
    decodeURIComponent(params.summonerName),
    decodeURIComponent(params.tag)
  );

  const champions = await getChampions();
  const matches = await getMatches(summoner.summonerData?.puuid!, 20);

  if (summoner.status !== 200) {
    return (
      <SummonerNotFound
        summonerName={decodeURIComponent(params.summonerName)}
        tag={params.tag}
        server="euw1"
      />
    );
  }

  const getSummonerAsParticipant = (match: Match) => {
    return match.info.participants.find((item) => item.puuid == summoner.summonerData?.puuid)
  };

  return (
    <div className="flex flex-col md:flex-row gap-[8px] p-2 font-inter">
        <div className="w-full md:w-1/3 space-y-2" >
          {summoner.summonerData?.leagues.map((league: League) => {
            return <SummonerRank key={league.queueType} {...league} />;
          })}
          <ChampionStatBoard matches={matches} summonerPuuid={summoner.summonerData!.puuid} champions={champions} />
        </div>
        <div className="w-full md:w-2/3">
          
          {matches.map((match) => {
            return (
              <MatchItem key={match.info.gameId} match={match} summonerAsParticipant={getSummonerAsParticipant(match) as any} champions={champions} />
            );
          })}
        </div>
    </div>
  );
};

export default SummonerPage;
