import SummonerNotFound from "@/components/Summoner/SummonerNotFound";
import { Button } from "@/components/ui/button";
import { getRandomBackground } from "@/utils";
import { getSummonerIdByName } from "@/utils/summoner";
import { League } from "@prisma/client";
import Image from "next/image";
import React from "react";

const SummonerPage = async ({
  params,
}: {
  params: {
    tag: string;
    summonerName: string;
  };
}) => {
  const randomBackground = await getRandomBackground();


  const summoner = await getSummonerIdByName(
    "euw1",
    decodeURIComponent(params.summonerName),
    decodeURIComponent(params.tag)
  );

  console.log(summoner.leagues);

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
    <div className="w-full min-h-screen flex flex-col items-center relative">
      <div
        className="abosolute min-h-screen w-full top-0 left-0"
        style={{
          backgroundImage: `url(${randomBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(15px)",
        }}
      />
      <div className="w-full md:w-3/6 absolute bg-zinc-800 bg-opacity-20 border border-zinc-800 border-opacity-55 min-h-screen">
       
        <div className="flex w-full  min-h-[100px] gap-2 bg-zinc-800 bg-opacity-30 p-2">
        <div className="relative drop-shadow-md ">
            <Image
              src={`http://ddragon.leagueoflegends.com/cdn/14.12.1/img/profileicon/${summoner.profileIconId}.png`}
              alt="profile icon"
              width={100}
              height={100}
              className="rounded-md"
            />
            <p className="absolute bottom-0  bg-zinc-800 bg-opacity-[87%] text-white text-sm w-1/2  text-center rounded-tr-lg rounded-bl-md">{summoner.summonerLevel}</p>
           
        </div>
          <div className="text-white text-opacity-90 space-y-4">
            <h1 className="text-xl font-bold ">{summoner.name} <span className="italic font-semibold text-lg text-opacity-50 text-white">#{params.tag.toUpperCase()}</span></h1>
            <Button className="w-[100px] bg-transparent border border-zinc-800 border-opacity-90">
              Refresh
            </Button>
          </div>
        </div>
        {summoner.leagues ? (
          summoner.leagues.map((league: League) => {
            return (
              <div key={league.leagueId}>
                <p>{league.queueType}</p>
                <p>{league.tier}</p>
                <p>{league.rank}</p>
                <p>{league.leaguePoints}</p>
                <p>{league.wins}</p>
                <p>{league.losses}</p>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SummonerPage;
