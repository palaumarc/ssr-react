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

export const shouldLoad = state => state.length === 0;
export const getGameRuns = state => state.map(toSimplifiedStructure);
export const getLastGameRun = state => state[0] ? toSimplifiedStructure(state[0]) : state[0];

const toSimplifiedStructure = run => ({
    videoUrl: run.videos.links[0].uri,
    playerName: run.players[0].name || run.players[0].id,
    duration: run.times.primary
});