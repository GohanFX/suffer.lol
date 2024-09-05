import { League, Summoner } from "@prisma/client";
import { error } from "console";
import { getMatches } from "./matches";

interface SummonerDTO extends Summoner {
  leagues: League[];
  masteries: ChampionDTO[];
}

interface SummonerInfo {
  server: string,
  summonerName?: string,
  summonerId?: string,
  tag: string
}


class SummonerApi {
    private server: string;
    private summonerName: string;
    private tag: string;
    constructor({server, summonerName, tag}: SummonerInfo) {
      this.server = server;
      this.summonerName = summonerName || '';
      this.tag = tag;
    }

    async getSummonerId() {
      const response = await fetch(
        `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${this.summonerName}/${this.tag}`,
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
      const { puuid } = await response.json();
      return puuid;
    }
}


async function getSummonerByName(
  {server, summonerName, tag}: SummonerInfo
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
  if(response.status !== 200) {
    return {
      status: response.status,
    };
  }
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
  const summonerData: SummonerDTO = {

    ...data,
    leagues: leagueData,
  };

  const championMastery = await fetch(`https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY!
    }
  })
  const championData: ChampionDTO[] = await championMastery.json();
  
  return {
    status: 200,
    name: gameName,
    summonerData: {
      ...summonerData,
      name: gameName,
      tag,
      masteries: championData,
    },
  };
}



interface ChampionDTO {
  puuid: string;
  championPointsSinceLastLevel: number;
  championId: number;
  lastPlayTime: number;
  championLevel: number;
  championPoints: number;
  championPointsUntilNextLevel: number;
  markRequiredForNextLevel: number;
  championSeasonMilestone: number;
  tokensEarned: number;
  milestoneGrades: Array<string>;
}



export { getSummonerByName };
export type {ChampionDTO}
