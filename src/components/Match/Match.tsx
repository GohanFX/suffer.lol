import { HTMLAttributes } from "react";
import { Card, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import "./Matches.css"
const MatchBoard = ({className, children}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card className={cn("flex flex-col bg-transparent w-full h-full border-zinc-800", className)}>
        {children}
    </Card>
  );
};
const MatchBoardHeader = ({className, children}: HTMLAttributes<HTMLDivElement>) => {
    return (
      <CardHeader className={cn("flex flex-row border-b w-full border-[#0E0B0D] p-4", className)}>
          {children}
      </CardHeader>
    );
};

interface MatchContentProps extends HTMLAttributes<HTMLDivElement> {
   win: boolean;
};


const MatchContent = ({className, children, win}: MatchContentProps) => {
    return (
      <div className={cn(`flex w-full min-h-[120px] items-center gap-2 p-4 ${win ? "match-win " : "bg-gradient-to-r from-[#EC0808] via-90% to-[#AFB3FF]/40"}`, className)}>
          {children}
      </div>
    );
}
  

export {MatchBoard, MatchBoardHeader, MatchContent}
