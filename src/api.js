import fetch from "isomorphic-fetch";
import parseJsonp from "parse-jsonp";

const speedRunGamesUrl = "http://www.speedrun.com/api/v1/games";

export function getGames() {
    return get(speedRunGamesUrl)
}

// In order to workaround Same Origin Policy it is necessary
// to ask for JSONP responses instead of JSON
// https://github.com/speedruncomorg/api/tree/master/version1
export const get = async (url) => {
    const urlObject = new URL(url);
    urlObject.searchParams.append('callback', 'callback');
    const response = await fetch(urlObject.toString());
    const responseAsText = await response.text();
    const parsedResponse = await parseJsonp('callback', responseAsText);
    return parsedResponse.data;
}
