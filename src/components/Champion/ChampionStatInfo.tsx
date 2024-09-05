import {cn} from "@/lib/utils";
import * as React from "react"
import {Card} from "@/components/ui/card";
import "./Statistics.css"
import Image from "next/image";
import Link from "next/link";
interface ChampionStatInfo extends React.HTMLAttributes<HTMLDivElement> {

}


const ChampionStatInfoCard = React.forwardRef<HTMLDivElement, ChampionStatInfo>(({className, children}: ChampionStatInfo, ref) =>
    <div className={cn("flex board flex-col relative ", className)} ref={ref}>
        {children}
    </div>
);

ChampionStatInfoCard.displayName = "ChampionStatInfoCard";
const ChampionStatInfoHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, children}, ref) => (
    <div className={cn("p-3 text-xl text-white/60 font-medium w-full ", className)} ref={ref}>
        {children}
    </div>
));

ChampionStatInfoHeader.displayName = "ChampionStatInfoHeader"


const ChampionStatPictureFrame = React.forwardRef<HTMLImageElement, {
        src: string,
        alt?: string,
        height?: number,
        width?: number,
        x?: number,
        y?: number,
        className?: string,
}>(({src, alt, height, width, className, y, x}, ref) => (
    <div className={cn("rounded-[15px]", className)} ref={ref} style={
        {
            height: `${height}px`,
            width: `${width}px`,
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `-${x}px -${y}px`,
            overflow: "hidden",
            transform: `scale(0.798)`,

        }
    } />
));
ChampionStatPictureFrame.displayName = "ChampionStatInfoPictureFrame";

const ChampionStatDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, children}, ref) => (
    <div className={cn("flex flex-col h-full justify-center", className)} ref={ref}>
        {children}
    </div>
));

const ChampionStatFooter = ({className, children, style,href }: React.LinkHTMLAttributes<HTMLAnchorElement>) => {
    return <Link href={href!} className={cn("p-1 text-center text-white hover:bg-panels/30 rounded-md", className)}>{children}</Link>;

}


ChampionStatDescription.displayName = "ChampionStatDescription";

export {ChampionStatInfoCard, ChampionStatPictureFrame, ChampionStatFooter, ChampionStatDescription, ChampionStatInfoHeader};