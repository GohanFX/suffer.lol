import { Match, MatchParticipant } from "@/utils/matches";
import { calculateTimeSpan } from "@/utils/time";
import React from "react";

const MatchInformation = ({match, summoner}: {match: Match, summoner: MatchParticipant}) => {
  return (
    <div className="h-full flex flex-col justify-end p-2 font-semibold">
      <h2 className="text-[18px] leading-4">
        {Math.floor(match.info.gameDuration / 60)}:
        {match.info.gameDuration % 60}
      </h2>
      <h3 className="text-[14px] leading-3">Ranked Solo</h3>
      <p className="leading-none text-[12px] text-white/70">
        {calculateTimeSpan(match.info.gameCreation)}
      </p>
      <h4 className="text-lg leading-4">{summoner?.win ? "Win" : "Lose"}</h4>
    </div>
  );
};

export default MatchInformation;
