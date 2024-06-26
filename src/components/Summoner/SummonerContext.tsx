import { Summoner } from '@/utils/summoner';
import React, { createContext, useState } from 'react';

// Define the shape of the summoner data
interface SummonerData extends Summoner {

}

// Create the context
export const SummonerContext = createContext<SummonerData>({} as SummonerData);


interface SummonerProviderProps {
    children: React.ReactNode;
};

// Create a provider component to wrap your app
export const SummonerProvider = ({children}: SummonerProviderProps) => {
    // Define the state to store the summoner data
    const [summoner, setSummoner] = useState<SummonerData>({} as SummonerData);

    return (
        <SummonerContext.Provider value={summoner}>
            {children}
        </SummonerContext.Provider>
    );
};