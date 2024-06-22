"use server";

import Image from "next/image";
import { db, getRandomBackground } from "@/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SummonerSearcher from "@/components/SummonerSearch/SummonerSearcher";
import { SummonerProps } from "@/components/SummonerSearch/Summoner";
export default async function Home() {
  const randomBackground = await getRandomBackground();
  let searchResults: SummonerProps[] = [];

  async function searchSummoner(name: string) {
    "use server";
     const doesExist = await db.summoner.findFirst({
      where: {
        name: {
          contains: name,
        },
      },
     });
     if(doesExist) {
        searchResults.push(doesExist);
     }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <div
        className="abosolute min-h-screen w-full top-0 left-0"
        style={{
          backgroundImage: `url(${randomBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(15px)",
        }}
      />

      <div className="flex flex-col items-center top-0 left-0 justify-center min-h-screen w-full absolute leading-none">
        <div className="w-3/6 shadow-text  outline-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h1 className="text-4xl font-bold text-white text-left  ">
            Hello, Summoner!
          </h1>
          <p className="text-white text-left text-opacity-60">
            Check your league match history here
          </p>
          <div className="relative w-full ">
            <div className="w-full flex flex-row bg-zinc-800 mt-2 bg-opacity-35  rounded-md border border-slate-800 border-opacity-40  border-text">
              <Select>
                <SelectTrigger className="w-1/6 bg-transparent border-0 outline-none text-white text-opacity-80">
                  <SelectValue
                    className="text-white"
                    placeholder="Select a region"
                  ></SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 bg-opacity-50 ">
                  <SelectGroup className="text-white text-opacity-70">
                    <SelectLabel>Regions</SelectLabel>
                    <SelectItem value="na1">North America</SelectItem>
                    <SelectItem value="euw1">Europe West</SelectItem>
                    <SelectItem value="eun1">Europe Nordic & East</SelectItem>
                    <SelectItem value="kr">Korea</SelectItem>
                    <SelectItem value="jp1">Japan</SelectItem>
                    <SelectItem value="br">Brazil</SelectItem>

                    <SelectItem value="oc1">OCE</SelectItem>
                    <SelectItem value="ru">Russia</SelectItem>
                    <SelectItem value="tr1">Turkey</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <SummonerSearcher searchFunction={searchSummoner} summoners={searchResults} />
            </div>
         
            
          </div>
        </div>
      </div>
    </main>
  );
}
