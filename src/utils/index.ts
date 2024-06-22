import { SummonerProps } from "@/components/SummonerSearch/Summoner";
import { PrismaClient } from "@prisma/client";

interface ChampionDataDragon {
    type: string;
    format: string;
    version: string;
    data: {
        [key: string]: Champion;
    };

}

interface Champion {
    id: string;
    name: string;
    title: string;
    blurb: string;
    info: {
        attack: number;
        defense: number;
        magic: number;
        difficulty: number;
    };
    tags: string[];
    partype: string;
    stats: {
        hp: number;
        hpperlevel: number;
        mp: number;
        mpperlevel: number;
        movespeed: number;
        armor: number;
        armorperlevel: number;
        spellblock: number;
        spellblockperlevel: number;
        attackrange: number;
        hpregen: number;
        hpregenperlevel: number;
        mpregen: number;
        mpregenperlevel: number;
        crit: number;
        critperlevel: number;
        attackdamage: number;
        attackdamageperlevel: number;
        attackspeedperlevel: number;
        attackspeed: number;
    };
}



async function getChampions() {
    const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/champion.json');
    const data: ChampionDataDragon = await response.json();
    return data.data;
};

function generateRandom(max: number) {
    return Math.floor(Math.random() * max);
}

export async function getRandomBackground() {
    const champions = await getChampions();
    const randomChampion = generateRandom(Object.keys(champions).length);
    const champion = champions[Object.keys(champions)[randomChampion]];
    console.log(champion)
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;

}

export const db = new PrismaClient();
