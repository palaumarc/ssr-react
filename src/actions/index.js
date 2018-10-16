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
    return async dispatch => {
        const games = await api.getGames();
        dispatch(storeGames(games));
    }
}

export const loadGameDetail = gameId => {

    return async (dispatch, getState) => {

        let games = getGames(getState());

        if (games.length === 0) {
            await dispatch(fetchGames())
            games = getGames(getState());
        }

        const selectedGame = games.find(game => game.id === gameId);
        return dispatch(fetchGameRuns(selectedGame));
    }
}

export const resetGameRuns = () => ({
    type: RESET_GAME_RUNS
})

const fetchGameRuns = game => {
    return async (dispatch) => {
        const selectedGameRunsLink = game.links.find(link => link.rel === "runs");
        const gameRuns = await api.get(selectedGameRunsLink.uri);
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