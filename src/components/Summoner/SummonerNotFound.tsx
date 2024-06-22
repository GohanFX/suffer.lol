import React from 'react'

interface SummonerNotFoundProps {
    summonerName: string
    tag: string,
    server: string
}

const SummonerNotFound = ({summonerName, tag, server}: SummonerNotFoundProps) => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
        <p>Summoner {summonerName} not found on {server} with tag {tag}</p>
    </div>
  )
}

export default SummonerNotFound