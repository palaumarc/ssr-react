import {
    STORE_GAME_RUNS,
    RESET_GAME_RUNS
} from "../actions/actionTypes";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case STORE_GAME_RUNS:
            return action.payload;
        case RESET_GAME_RUNS:
            return initialState;
        default:
            return state;
    }
};

export const getGameRuns = state => state