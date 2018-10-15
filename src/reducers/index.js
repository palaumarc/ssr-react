import { combineReducers } from "redux";

import * as gamesReducer from "./games";

export default combineReducers({
    games: gamesReducer.default
});

export const getGames = state => gamesReducer.getGames(state.games);