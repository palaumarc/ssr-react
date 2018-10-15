import {
    getGames
} from "../api"

import {
    STORE_GAMES
} from "./actionTypes";

export const fetchGames = () => {
    return dispatch => {
        return getGames()
            .then(games => {
                dispatch(storeGames(games))
            })
    }
}

const storeGames = games => ({
    type: STORE_GAMES,
    payload: games
})