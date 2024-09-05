"use client"
import { MatchBoard, MatchBoardHeader, MatchContent } from "./Match";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Match, MatchParticipant } from "@/utils/matches";
import Image from "next/image";
import { ChampionDTO } from "@/lib/champions";
import MatchFilters from "./MatchFilters";
import React, { ChangeEvent } from "react";
import MatchInformation from "./MatchDetails/MatchInformation";
import { getRandomTitle, TitleType } from "@/utils/titles";

const MatchPanel = ({
  matches,
  champions,
  summonerId
}: {
  matches: Match[];
  summonerId: string,
  champions: ChampionDTO;
}) => {

  function getSummoner(match: Match) {
    return match.info.participants.find(
      (item) => item.puuid === summonerId
    );
  }
  const [filter, setFilter] = React.useState<string>("");

  return (
    <MatchBoard className="bg-panels/75 font-inter ">
      <MatchBoardHeader className="justify-between items-center">
        <h1 className="text-white text-xl font-bold">Match History</h1>
        <div className="flex gap-2 xl:flex-row flex-col items-end">
            <MatchFilters filter={filter} setFilter={setFilter} />
        </div>
      </MatchBoardHeader>
      <div className="flex flex-col gap-2 p-4">
        {matches.slice(0, 20).filter((match) => getSummoner(match)?.championName.includes(filter) || match.info.participants.find((participant) => participant.summonerName.includes(filter))).map((match) => {
          const summoner = getSummoner(match);
          const title = getRandomTitle(summoner?.win ? TitleType.WIN : TitleType.LOSE);
          return (
            <MatchContent
              key={match.info.gameId}
              className="text-white rounded-md drop-shadow-lg"
              win={summoner?.win!}
            >
              <MatchInformation match={match} summoner={summoner!} />

              <div className="relative  flex items-center h-[70px] w-[70px] rounded-[10px] overflow-hidden ">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${
                    champions.data[summoner?.championName!].image.full
                  }`}
                  fill={true}
                  alt={summoner?.championName!}
                  title={summoner?.championName}
                  className="rounded-md w-[80px] h-[80px]"
                  style={{
                    objectFit: "cover",
                    transform: "scale(1.13)",
                  }}
                />
                <div className="absolute bottom-0 w-full flex items-center justify-center   text-[0.75rem] leading-4">
                  <p className="bg-panels/75 w-[30px] rounded-t-md text-center">
                    {summoner?.champLevel}
                  </p>
                </div>
              </div>
              <div className="  h-full max-w-[15%]">
                <p className="mb-3 mt-1">
                  {summoner?.kills}/{summoner?.deaths}/{summoner?.assists}
                </p>
                <div className=" leading-none uppercase">
                  <h2 className="text-[1.25rem]">{title.title}</h2>
                  <p className="text-[0.8rem] w-full text-white text-opacity-60">
                    {title.subtitle}
                  </p>
                </div>
              </div>
              <div className="grid-cols-4 w-[30%]">
                  {summoner?.summoner1Id}
              </div>
            </MatchContent>
          );
        })}
      </div>
    </MatchBoard>
  );
};



export default MatchPanel;
