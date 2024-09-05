
import {ChampionInformation} from "@/utils/matches";
import {ChampionStatDescription, ChampionStatPictureFrame} from "@/components/Champion/ChampionStatInfo";

function calculteWinrate(wins: number, games: number) {
    return (wins / games) * 100;
}

const ChampionStats = ({wins, kda, deaths, kills, loses, assists, gamesNumber, champion}: ChampionInformation ) => {
    const winrate = calculteWinrate(wins, gamesNumber);



    return <div className={"flex flex-row items-center p-2  w-full max-h-[50px] justify-between font-inter"}>
        <div className={"flex flex-row items-center space-x-[4px]"}>
            <ChampionStatPictureFrame
                src={`https://ddragon.leagueoflegends.com/cdn/14.14.1/img/sprite/${champion.image.sprite}`}
                width={champion.image.w}
                height={champion.image.h}
                x={champion.image.x}
                y={champion.image.y}
                className={""}
            />
            <ChampionStatDescription className={"text-white leading-none"}>
                <h2 className={"font-semibold text-[16px] leading-none"}>{champion.name}</h2>
                <p className={"text-[12px] text-white/60"}>{(kills / gamesNumber).toFixed(1)}/{(deaths / gamesNumber).toFixed(1)}/{(assists / gamesNumber).toFixed(1)}</p>
            </ChampionStatDescription>
        </div>

        <ChampionStatDescription className={" text-[12px] text-right justify-center"}>
            <p style={
                {
                    color: getWinrateColor(winrate),
                }
            } className={"leading-none text-[12px]"} >{winrate.toFixed(1)}%</p>
            <h2 className={"text-white leading-none text-[13px]"}>Winrate</h2>
            <p className={"text-[8px] text-white"}>W: {wins} L: {loses}</p>
        </ChampionStatDescription>
    </div>

}

function getWinrateColor(winrate: number) {

    if(winrate <= 50 && winrate >= 0) {
        return "#a8a19d";
    } else if(winrate > 50 && winrate <= 65) {
        return "#00BCD4";
    } else if(winrate > 65 && winrate <= 75) {
        return "#ffad14";
    } else {
        return "#EC7508";
    }
}



export default ChampionStats;