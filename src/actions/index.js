import * as api from "../api";

import {
    STORE_GAMES,
    STORE_GAME_RUNS,
    RESET_GAME_RUNS
} from "./actionTypes";

import {
    getGames
} from "../reducers"

export const fetchGames = () => {
    return dispatch => {
        return api.getGames()
            .then(games => {
                dispatch(storeGames(games))
            })
    }
}

export const loadGameDetail = gameId => {

    return (dispatch, getState) => {

        const games = getGames(getState());

        if (games.length === 0) {
            return dispatch(fetchGames())
                .then(() => {
                    const games = getGames(getState());
                    const selectedGame = games.find(game => game.id === gameId);
                    return dispatch(fetchGameRuns(selectedGame));
                })
        }

        const selectedGame = games.find(game => game.id === gameId);
        return dispatch(fetchGameRuns(selectedGame));
    }
}

export const resetGameRuns = () => ({
    type: RESET_GAME_RUNS
})

const fetchGameRuns = game => {
    return (dispatch) => {
        const selectedGameRunsLink = game.links.find(link => link.rel === "runs");
        return api.get(selectedGameRunsLink.uri)
            .then(runs => {
                dispatch(storeGameRuns(runs))
            })
    }
}

const storeGames = games => ({
    type: STORE_GAMES,
    payload: games
})

const storeGameRuns = runs => ({
    type: STORE_GAME_RUNS,
    payload: runs
})