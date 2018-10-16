import * as api from "../services/api";

import {
    STORE_GAMES,
    STORE_GAME_RUNS,
    RESET_GAME_RUNS
} from "./actionTypes";

import {
    shouldLoadGames,
    getGameById
} from "../reducers"

export const fetchGames = () => {
    return async dispatch => {
        const games = await api.getGames();
        dispatch(storeGames(games));
    }
}

export const loadGameDetail = gameId => {

    return async (dispatch, getState) => {

        if (shouldLoadGames(getState())) {
            await dispatch(fetchGames())
        }

        const game = getGameById(getState(), gameId);
        return dispatch(fetchGameRuns(game));
    }
}

export const resetGameRuns = () => ({
    type: RESET_GAME_RUNS
})

const fetchGameRuns = game => {
    return async (dispatch) => {
        const gameRuns = await api.get(game.links.runs);
        dispatch(storeGameRuns(gameRuns))
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