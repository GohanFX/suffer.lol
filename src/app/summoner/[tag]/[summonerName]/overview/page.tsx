import ProfileNavigation from "@/components/Navigation/ProfileNavigation";
import SummonerNotFound from "@/components/Summoner/SummonerNotFound";
import SummonerRank from "@/components/Summoner/SummonerRank";
import { Button } from "@/components/ui/button";
import { getRandomBackground } from "@/utils";
import { getSummonerIdByName } from "@/utils/summoner";
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

export async function generateMetadata({ params }: SummonerPageProps) {
  return {
    title: `Summoner ${decodeURIComponent(params.summonerName)}`,
    description: `View the profile of ${decodeURIComponent(
      params.summonerName
    )}`,
  };
}

const SummonerPage = async ({ params }: SummonerPageProps) => {
  const summoner = await getSummonerIdByName(
    "euw1",
    decodeURIComponent(params.summonerName),
    decodeURIComponent(params.tag)
  );


  if (summoner.status !== 200) {
    return (
      <SummonerNotFound
        summonerName={decodeURIComponent(params.summonerName)}
        tag={params.tag}
        server="euw1"
      />
    );
  }

  return (
    <div className="flex flex-col gap-[8px] p-2">
        <div className="w-full md:w-1/3 " >
          {summoner.leagues.map((league: League) => {
            return <SummonerRank {...league} />;
          })}
        </div>
    </div>
  );
};

export default SummonerPage;
