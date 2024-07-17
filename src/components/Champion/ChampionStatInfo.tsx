import {cn} from "@/lib/utils";
import * as React from "react"
import {Card} from "@/components/ui/card";
import Image from "next/image";
interface ChampionStatInfo extends React.HTMLAttributes<HTMLDivElement> {

}


const ChampionStatInfoCard = React.forwardRef<HTMLDivElement, ChampionStatInfo>(({className, children}: ChampionStatInfo, ref) =>
    <Card className={cn("flex p-2 flex-row bg-panels/75", className)} ref={ref}>
        {children}
    </Card>
);

ChampionStatInfoCard.displayName = "ChampionStatInfoCard";
const ChampionStatInfoHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, children}) => (
    <></>
));

ChampionStatInfoHeader.displayName = "ChampionStatInfoHeader"


const ChampionStatPictureFrame = React.forwardRef<HTMLImageElement, HTMLImageElement>(({src, alt, height, width, className}: HTMLImageElement, ref) => (
    <Image src={src} alt={alt} height={height} width={width} className={cn("rounded-md" ,className)} />
));
ChampionStatPictureFrame.displayName = "ChampionStatInfoPictureFrame";
const ChampionStatDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, children}) => (
    <div className={cn("flex flex-col h-full justify-center", className)}>
        {children}
    </div>
));
ChampionStatDescription.displayName = "ChampionStatDescription";

export {ChampionStatInfoCard, ChampionStatPictureFrame, ChampionStatDescription, ChampionStatInfoHeader};