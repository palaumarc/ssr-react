import fetch from "isomorphic-fetch";
import parseJsonp from "parse-jsonp";

const speedRunGamesUrl = "http://www.speedrun.com/api/v1/games";

export function getGames() {
    return get(speedRunGamesUrl)
}

// In order to workaround Same Origin Policy it is necessary
// to ask for JSONP responses instead of JSON
// https://github.com/speedruncomorg/api/tree/master/version1
export const get = (url) => {
    const urlObject = new URL(url);
    urlObject.searchParams.append('callback', 'callback');
    return fetch(urlObject.toString())
        .then(res => res.text())
        .then(jsonp => parseJsonp('callback', jsonp))
        .then(res => res.data);
}
