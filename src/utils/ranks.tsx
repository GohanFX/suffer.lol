import Bronz from '../assets/Rank=Bronze.png';
import Iron from '../assets/Rank=Iron.png';
import Silver from '../assets/Rank=Silver.png';
import Gold from '../assets/Rank=Gold.png';
import Platinum from '../assets/Rank=Platinum.png';
import Diamond from '../assets/Rank=Diamond.png';
import Master from '../assets/Rank=Master.png';
import Grandmaster from '../assets/Rank=Grandmaster.png';
import Challenger from '../assets/Rank=Challenger.png';
import { StaticImageData } from 'next/image';


function transformRank(rank: string): string {
    
    return rank === "RANKED_SOLO_5x5" ? "Solo/Duo" : "Flex";
}


const ranks: {[key: string]: StaticImageData} = {
    "IRON": Iron,
    "BRONZE": Bronz,
    "SILVER": Silver,
    "GOLD": Gold,
    "PLATINUM": Platinum,
    "DIAMOND": Diamond,
    "MASTER": Master,
    "GRANDMASTER": Grandmaster,
    "CHALLENGER": Challenger,
};

export { ranks, transformRank };