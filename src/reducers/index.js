import { combineReducers } from "redux";

import * as gamesReducer from "./games";
import * as gameRunsReducer from "./gameRuns";

export default combineReducers({
    games: gamesReducer.default,
    gameRuns: gameRunsReducer.default
});

export const shouldLoadGames = state => gamesReducer.shouldLoad(state.games);
export const getGames = state => gamesReducer.getGames(state.games);
export const getGameById = (state, gameId) => gamesReducer.getGameById(state.games, gameId);

export const shouldLoadGameRuns = state => gameRunsReducer.shouldLoad(state.gameRuns);
export const getGameRuns = state => gameRunsReducer.getGameRuns(state.gameRuns);
export const getLastGameRun = state => gameRunsReducer.getLastGameRun(state.gameRuns)