import { League } from "@prisma/client";
import { error } from "console";

interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  leagues: League[];
}

async function getSummonerIdByName(
  server: string,
  summonerName: string,
  tag: string
) {
  const response = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  );

  if (response.status !== 200) {
    return {
      status: response.status,
    };
  }

  const { puuid, gameName } = await response.json();
  const summoner = await fetch(
    `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/` +
      puuid,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  );
  const data = await summoner.json();
  const summonerLeague = await fetch(
    `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/` +
      data.id,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  );
  const leagueData = await summonerLeague.json();
console.log(data.puuid)
  return {
    status: 200,
    id: data.id,
    
    accountId: data.accountId,
    puuid: data.puuid,
    name: gameName,
    profileIconId: data.profileIconId,
    revisionDate: data.revisionDate,
    summonerLevel: data.summonerLevel,
    leagues: leagueData,
  };
}

export { getSummonerIdByName };
