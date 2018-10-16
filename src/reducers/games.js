import {
    STORE_GAMES
} from "../actions/actionTypes";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case STORE_GAMES:
            return action.payload;
        default:
            return state;
    }
};

export const shouldLoad = state => state.length === 0;
export const getGames = state => state
export const getGameById = (state, gameId) => state.find(game => game.id === gameId);