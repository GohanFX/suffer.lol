interface ChampionDTO {
    type: string
    format: string
    version: string
    data: {
        [key: string]: ChampionDetails
    }
}

interface ChampionDetails {
    version: string
    id: string
    key: string
    name: string
    title: string
    blurb: string
    info: {
        attack: number
        defense: number
        magic: number
        difficulty: number
    }
    image: {
        full: string
        sprite: string
        group: string
        x: number
        y: number
        w: number
        h: number
    }
    tags: string[]
    partype: string
    stats: {
        hp: number
        hpperlevel: number
        mp: number
        mpperlevel: number
        movespeed: number
        armor: number
        armorperlevel: number
        spellblock: number
        spellblockperlevel: number
        attackrange: number
        hpregen: number
        hpregenperlevel: number
        mpregen: number
        mpregenperlevel: number
        crit: number
        critperlevel: number
        attackdamage: number
        attackdamageperlevel: number
        attackspeedperlevel: number
        attackspeed: number
    }
}

async function getChampions() {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/champion.json`
  );
  const data: ChampionDTO = await response.json();
  
  return data;
}

export {getChampions}
export type {ChampionDTO, ChampionDetails}