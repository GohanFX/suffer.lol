"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ProfileNavigationProps {
    tag: string;
    summonerName: string;
    active: string;
    
};

const styles= {
    navigation: {
        link: "cursor-pointer pb-2 hover:border-zinc-50  transition-all duration-100 ease-in-out",
        activeLink: " text-white/80 border-b-2 border-b-zinc-100 transition-all duration-100 ease-in-out",
    }
}


const ProfileNavigation = ({tag, summonerName, active}: ProfileNavigationProps) => {

    const [activePage, setActivePage] = React.useState(active);

  return (
    <ul className="flex gap-[8px] p-[8px] space-x-[8px]  bg-zinc-800 bg-opacity-30 text-white/30">
      <li>
        <Link
          className={cn(activePage === "overview" && styles.navigation.activeLink, styles.navigation.link)}
          href={`/summoner/${tag}/${summonerName}/overview`}
          onClick={() => setActivePage("overview")}
        >
          Overview
        </Link>
      </li>
      <li>
        <Link
            className={cn(activePage === "champion-stats" && styles.navigation.activeLink, styles.navigation.link)}
          href={`/summoner/${tag}/${summonerName}/champion-stats`}
            onClick={() => setActivePage("champion-stats")}
        >
          Champion Stats
        </Link>
      </li>
      <li>
        <Link
        className={cn(activePage === "live" && styles.navigation.activeLink, styles.navigation.link)}
            onClick={() => setActivePage("live")}
         href={`/summoner/${tag}/${summonerName}/live`}>
          Live Game
        </Link>
      </li>
    </ul>
  );
};

export default ProfileNavigation;
