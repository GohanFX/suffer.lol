
function getApiPath(server: string) {
    return `https://api.${server}.riotgames.com`;
}

function getProfilePath(server: string, tag: string, summonerName: string) {
    return `/summoner/${tag}/${summonerName}`;
}