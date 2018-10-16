import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { 
    shouldLoadGames, 
    getGameById
} from "../../reducers";

import {
    resetGameRuns, 
    fetchGames,
    loadGameDetail
} from ".."

import * as types from '../actionTypes';
import * as api from '../../services/api';

jest.mock("../../reducers");
jest.mock('../../services/api');

const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares);

//We don't fill store's state as we will mock selectors directly
const state = {};
const store = mockStore(state);

const gamesMock = [
    {
        id: 1, 
        names: { 
            international: "internationalName"
        }, 
        assets: { 
            "cover-large" : { 
                uri: "logoUri"
            }
        },
        links: [
            { rel: "runs", uri: "link1Uri" },
            { rel: "noruns", uri: "link2Url" },
        ]
    },
    {
        id: 2, 
        names: { 
            international: "internationalName2"
        }, 
        assets: { 
            "cover-large" : { 
                uri: "logo2Uri"
            }
        },
        links: [
            { rel: "runs", uri: "link21Uri" },
            { rel: "noruns", uri: "link22Url" },
        ]
    }];

const gameRunsMock = [
        {
            videos: {
                links: [
                    {
                        uri: "link1Uri"
                    }
                ]
            },
            players: [
                {
                    id: "1",
                    name: "player1Name"
                }
            ],
            times: {
                primary: 101
            }
        },
        {
            videos: {
                links: [
                    {
                        uri: "link2Uri"
                    }
                ]
            },
            players: [
                {
                    id: "2"
                }
            ],
            times: {
                primary: 103
            }
        }
    ]

const getGameByIdReturnValueMock = {
    id: 1,
    name: "internationalName",
    logoUrl: "logoUri",
    links: {
        runs: "link1Uri"
    }
};

beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
    api.getGames.mockResolvedValue(gamesMock);
})

describe('fetchGames', () => {

    it('should call expected api method and dispatch expected actions', async () => {

        await store.dispatch(fetchGames());

        const expectedActions = [
            {
                type: types.STORE_GAMES,
                payload: gamesMock
            }
        ]

        expect(api.getGames).toHaveBeenCalledTimes(1);
        expect(api.getGames).toHaveBeenCalledWith();
        expect(store.getActions()).toEqual(expectedActions);

    })

})

describe('fetchGameRuns', () => {

    it('when shouldLoadGames is false, should call expected api method and dispatch expected actions', async () => {

        const gameId = 3;
        shouldLoadGames.mockReturnValue(false);
        getGameById.mockReturnValue(getGameByIdReturnValueMock);
        api.get.mockResolvedValue(gameRunsMock);

        await store.dispatch(loadGameDetail(gameId));

        const expectedActions = [
            {
                type: types.STORE_GAME_RUNS,
                payload: gameRunsMock
            }
        ]

        expect(api.getGames).not.toHaveBeenCalled();
        expect(getGameById).toHaveBeenCalledTimes(1);
        expect(getGameById).toHaveBeenCalledWith(state, gameId);
        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith(getGameByIdReturnValueMock.links.runs)
        expect(store.getActions()).toEqual(expectedActions);

    })

    it('when shouldLoadGames is true, should call expected api method and dispatch expected actions', async () => {

        const gameId = 3;
        shouldLoadGames.mockReturnValue(true);
        getGameById.mockReturnValue(getGameByIdReturnValueMock);
        api.get.mockResolvedValue(gameRunsMock);

        await store.dispatch(loadGameDetail(gameId));

        const expectedActions = [
            {
                type: types.STORE_GAMES,
                payload: gamesMock
            },
            {
                type: types.STORE_GAME_RUNS,
                payload: gameRunsMock
            }
        ]

        expect(api.getGames).toHaveBeenCalledTimes(1);
        expect(api.getGames).toHaveBeenCalledWith()
        expect(getGameById).toHaveBeenCalledTimes(1);
        expect(getGameById).toHaveBeenCalledWith(state, gameId);
        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith(getGameByIdReturnValueMock.links.runs)
        expect(store.getActions()).toEqual(expectedActions);

    })

})

describe('resetGameRuns', () => {

    it('should return expected action', () => {

        const action = resetGameRuns();
        const expectedAction = {
            type: types.RESET_GAME_RUNS
        }

        expect(action).toEqual(expectedAction);

    })

})