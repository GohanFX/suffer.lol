import { ChampionDTO } from "@/lib/champions";
import { Match, MatchParticipant } from "@/utils/matches";

import Image from "next/image";
import React from "react";

interface MatchItemProps {
  match: Match;
  summonerAsParticipant: MatchParticipant;
  champions: ChampionDTO;
}

const MatchItem = ({
  match,
  summonerAsParticipant,
  champions,
}: MatchItemProps) => {
  return (
    <div className="flex flex-row gap-[8px] mt-2 mx-2 border border-zinc-800/60 rounded-md p-2 bg-zinc-800/30 transition-colors hover:bg-zinc-800/50">
      <div className="w-1/6">
        <Image
          className="rounded-full transform "
          alt={summonerAsParticipant.championName!}
          src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${
            champions.data[summonerAsParticipant.championName!].image.full
          }`}
          width={64}
          height={64}
        />
      </div>
      <div className="w-5/6">
        <h1>ASD</h1>
        <p>
          {Math.floor(match.info.gameDuration / 60)}:
          {match.info.gameDuration % 60}
        </p>
      </div>
    </div>
  );
};

export default MatchItem;
