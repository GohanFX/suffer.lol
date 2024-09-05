interface Titles {
  wins: Array<{
    title: string;
    subtitle: string;
  }>,
  loses: Array<{
    title: string;
    subtitle: string;
  }>;
  
}

export const titles: Titles = {
    wins: [{title: "Carry", subtitle: "Absolute Monster"}, {title: "Unstoppable", subtitle: "1vs9 Machine"}],
    loses: [{title: "Feeder", subtitle: "Unlucky"}, {title: "Int", subtitle: "Unfortunate"}]
};

export enum TitleType {
    WIN,
    LOSE
};

function getRandomTitle(titleType: TitleType) {
   
    const titlesArray = titleType === TitleType.WIN ? titles.wins : titles.loses;
    const randomIndex = Math.floor(Math.random() * titlesArray.length);
    return titlesArray[randomIndex];
}

export {getRandomTitle};