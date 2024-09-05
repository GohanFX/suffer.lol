
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
import { Summoner } from "@prisma/client";
export default async function Home() {

  let searchResults: Summoner[] = [];

  async function searchSummoner(name: string) {

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
    <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-800 no-scrollbar w-full">
      <div className=" w-full leading-none container flex flex-col justify-center items-center min-h-screen no-scrollbar">
        <div className="w-full md:w-3/6 p-2  shadow-text  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
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
              <SummonerSearcher  />
            </div>
         
            
          </div>
        </div>
      </div>
    </main>
  );
}
