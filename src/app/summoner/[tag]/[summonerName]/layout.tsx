import ProfileNavigation from "@/components/Navigation/ProfileNavigation";
import SummonerNotFound from "@/components/Summoner/SummonerNotFound";
import { Button } from "@/components/ui/button";
import { getRandomBackground } from "@/utils";
import { getSummonerIdByName } from "@/utils/summoner";
import { League } from "@prisma/client";
import Image from "next/image";
import React from "react";

const layout = async ({
  params,
  children,
}: {
  params: {
    tag: string;
    summonerName: string;
  };
  children: React.ReactNode;
}) => {
  let randomBackground = await getRandomBackground();

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
        <div className="flex w-full  min-h-[100px] gap-[8px] bg-zinc-800 bg-opacity-30 p-[8px]">
          <div className="relative drop-shadow-md ">
            <Image
              src={`http://ddragon.leagueoflegends.com/cdn/14.12.1/img/profileicon/${summoner.profileIconId}.png`}
              alt="profile icon"
              width={100}
              height={100}
              className="rounded-md"
            />
            <p className="absolute bottom-0  bg-zinc-800 bg-opacity-[87%] text-white text-sm w-1/2  text-center rounded-tr-lg rounded-bl-md">
              {summoner.summonerLevel}
            </p>
          </div>
          <div className="text-white text-opacity-90 space-y-[16px]">
            <h1 className="text-xl font-bold ">
              {summoner.name}{" "}
              <span className="italic font-semibold text-lg text-opacity-50 text-white">
                #{params.tag.toUpperCase()}
              </span>
            </h1>
            <Button className="w-[117px] h-[40px] bg-transparent border border-zinc-800 border-opacity-90">
              Refresh
            </Button>
          </div>
        </div>
        <ProfileNavigation
          active="overview"
          tag={params.tag}
         
          summonerName={params.summonerName}
        />
        {children}
      </div>
    </div>
  );
};

export default layout;
