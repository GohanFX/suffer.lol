import { ChampionGames } from "@/components/Champion/ChampionStatBoard";
import { ChampionDetails, ChampionDTO } from "@/lib/champions";

// Define types and interfaces
interface MatchMetaData {
  dataVersion: string;
  matchId: string;
  participants: string[];
}

interface PerkSelection {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}

interface PerkStyle {
  description: string;
  selections: PerkSelection[];
  style: number;
}

interface ParticipantPerks {
  statPerks: {
    defense: number;
    flex: number;
    offense: number;
  };
  styles: PerkStyle[];
}

interface MatchParticipant {
  assists: number;
  baronKills: number;
  bountyLevel: number;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  championTransform: number;
  consumablesPurchased: number;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  goldEarned: number;
  goldSpent: number;
  individualPosition: string;
  inhibitorKills: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  neutralMinionsKilled: number;
  nexusKills: number;
  nexusLost: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  participantId: number;
  pentaKills: number;
  perks: ParticipantPerks;
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  profileIcon: number;
  puuid: string;
  quadraKills: number;
  riotIdName: string;
  riotIdTagline: string;
  role: string;
  sightWardsBoughtInGame: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: boolean;
  teamId: number;
  teamPosition: string;
  timeCCingOthers: number;
  timePlayed: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalHeal: number;
  totalHealsOnTeammates: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretsLost: number;
  unrealKills: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
}

interface MatchInfo {
  gameCreation: number;
  gameDuration: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: MatchParticipant[];
}

interface Match {
  metadata: MatchMetaData;
  info: MatchInfo;
}

interface ChampionInformation {
  name: string;
  gamesNumber: number;
  wins: number;
  loses: number;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  champion: ChampionDetails;
}

interface ChampionStat {
  [key: string]: ChampionInformation;
}

// Functions

async function fetchMatchIds(puuid: string, numberOfMatches: number): Promise<string[]> {
  const response = await fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${numberOfMatches}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch match IDs");
  }

  return await response.json();
}

async function fetchMatchData(matchId: string): Promise<Match> {
  const response = await fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch match data for match ID: ${matchId}`);
  }

  return await response.json();
}

async function getMatches(puuid: string, numberOfMatches: number = 5): Promise<Match[]> {
  try {
    const matchIds = await fetchMatchIds(puuid, numberOfMatches);

    const matches = await Promise.all(matchIds.map(fetchMatchData));

    return matches.filter((match) => match.info.gameMode === "CLASSIC");
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getSummonerAsParticipant = (match: Match, summonerPuuid: string): MatchParticipant | undefined => {
  return match.info.participants.find((participant) => participant.puuid === summonerPuuid);
};

function groupByChampions(matches: Match[], summonerPuuid: string): ChampionGames {
  const championsPlayed: ChampionGames = {
    summonerPuuid,
    champions: {},
  };

  matches.forEach((match) => {
    const summonerParticipant = getSummonerAsParticipant(match, summonerPuuid);
    if (!summonerParticipant) return;

    const { championName } = summonerParticipant;
    if (!championsPlayed.champions[championName]) {
      championsPlayed.champions[championName] = [];
    }

    championsPlayed.champions[championName].push(match);
  });

  return championsPlayed;
}

function calculateChampionStats(championGames: ChampionGames, champions: ChampionDTO): ChampionStat {
  const championStats: ChampionStat = {};

  Object.keys(championGames.champions).forEach((championName) => {
    championGames.champions[championName].forEach((game) => {
      const summoner = getSummonerAsParticipant(game, championGames.summonerPuuid);
      if (!summoner) return;

      if (!championStats[championName]) {
        championStats[championName] = {
          name: "",
          gamesNumber: 0,
          wins: 0,
          loses: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          kda: 0,
          champion: {} as ChampionDetails,
        };
      }

      const currentStats = championStats[championName];
      currentStats.champion = champions.data[championName];
      currentStats.name = championName;
      currentStats.gamesNumber += 1;
      currentStats.wins += summoner.win ? 1 : 0;
      currentStats.loses += summoner.win ? 0 : 1;
      currentStats.kills += summoner.kills;
      currentStats.deaths += summoner.deaths;
      currentStats.assists += summoner.assists;
      currentStats.kda += (summoner.kills + summoner.assists) / currentStats.deaths;
    });
  });

  return championStats;
}

// Export functions and types
export { getMatches, getSummonerAsParticipant, calculateChampionStats, groupByChampions };


export type {Match, MatchInfo, MatchParticipant, MatchMetaData, ParticipantPerks, ChampionInformation}