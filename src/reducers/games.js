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
export const getGames = state => state.map(toSimplifiedStructure)
export const getGameById = (state, gameId) => {
    const selectedGame = state.find(game => game.id === gameId);
    return selectedGame ? toSimplifiedStructure(selectedGame) : selectedGame;
};

const getRunsUrl = game => {
    const link = game.links.find(link => link.rel === "runs");
    return link ? link.uri : link;
}

const toSimplifiedStructure = game => ({
    id: game.id,
    name: game.names.international,
    logoUrl: game.assets["cover-tiny"].uri,
    links: {
        runs: getRunsUrl(game)
    }
})