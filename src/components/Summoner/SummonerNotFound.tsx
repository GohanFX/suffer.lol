import { getRandomBackground } from "@/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface SummonerNotFoundProps {
  summonerName: string;
  tag: string;
  server: string;
}

const SummonerNotFound =  ({
  summonerName,
  tag,
  server,
}: SummonerNotFoundProps) => {


  return (
    <div className="min-h-screen w-full flex items-center justify-center relative">
      <div
        className="abosolute min-h-screen w-full top-0 left-0"

      />
      <div className="h-full w-full absolute flex items-center justify-center p-2">
        <div className="sm:w-3/4 md:w-1/4 h-[400px] bg-zinc-800/30 border border-zinc-800/60 rounded-md p-[32px] relative">
        <h1 className="text-[32px] text-white/75 font-semibold">Something went wrong!</h1>
          <p className="text-white/50 text-[24px] tracking-tighter leading-none font-light">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
            We couldn't find the summoner <span className="italic font-semibold">{summonerName}</span> on the server {server} with the tag #{tag}
          </p>
          <div className="absolute bottom-0 left-0 p-[32px] w-full flex">
            <Link href="/" className={' text-center w-full  text-white/60 border-zinc-800/60 hover:bg-zinc-800/40 hover:text-white/80'}>
              
                Go back home
              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummonerNotFound;
