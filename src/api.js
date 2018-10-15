import fetch from "isomorphic-fetch";

export function getGames( ) {
    console.log("get games");
    return fetch("http://www.speedrun.com/api/v1/games")
        .then(res => res.json())
        .then(res => res.data)
}