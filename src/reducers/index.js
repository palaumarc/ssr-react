import { combineReducers } from "redux";

import * as gamesReducer from "./games";
import * as gameRunsReducer from "./gameRuns";

export default combineReducers({
    games: gamesReducer.default,
    gameRuns: gameRunsReducer.default
});

export const getGames = state => gamesReducer.getGames(state.games);
export const getGameRuns = state => gameRunsReducer.getGameRuns(state.gameRuns);