

import ProfileNavigation from "@/components/Navigation/ProfileNavigation";
import SummonerNotFound from "@/components/Summoner/SummonerNotFound";
import { Button } from "@/components/ui/button";
import {  getSummonerByName } from "@/utils/summoner";
import Image from "next/image";
import React from "react";
import "@/components/Match/Matches.css";
import "@/components/Champion/Statistics.css"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
interface SummonerPageProps {
  params: {
    tag: string;
    summonerName: string;
  };
}


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

  const summoner = await getSummonerByName({
    server: "euw1",
    summonerName: decodeURIComponent(params.summonerName),
    tag: decodeURIComponent(params.tag),
  });

  return (
  
      <div className="w-full flex flex-col items-center ">
        <div className="w-full md:w-3/6 absolute  bg-zinc-800/30 border p-2 space-y-2 border-zinc-800 border-opacity-55 min-h-screen border-t-0">
          <div className="bg-panels/75   rounded-[10px] p-2">
          <div className="flex w-full  min-h-[100px]  gap-[8px]  p-[8px]">
            <div className="relative drop-shadow-md ">
              <Image
                src={`http://ddragon.leagueoflegends.com/cdn/14.12.1/img/profileicon/${summoner!.summonerData?.profileIconId}.png`}
                alt="profile icon"
                width={100}
                height={100}
                className="rounded-md"
              />
              <p className="absolute bottom-0  bg-zinc-800 bg-opacity-[87%] text-white text-sm w-1/2  text-center rounded-tr-lg rounded-bl-md">
                {summoner.summonerData?.summonerLevel}
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
          </div>
          {children}
        </div>
      </div>
   
  );
};

export default layout;
