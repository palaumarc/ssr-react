import React from "react";
import ReactDOM from "react-dom";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from "react-test-renderer";
import GameDetailContainer from "../GameDetailContainer";
import reduxThunk from 'redux-thunk';
import {
    shouldLoadGameRuns,
    shouldLoadGames,
    getGameById,
    getLastGameRun
} from "../../reducers";

import {
    loadGameDetail,
    resetGameRuns
} from "../../actions"

jest.mock("../../reducers");
jest.mock("../../actions");
jest.mock("../GameDetail", () => 'game-detail-mock');

const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares);

//We don't fill store's state as we will mock selectors directly
const state = {};
const store = mockStore(state);

const game = {
    id: '1',
    name: 'dummyName1',
    logoUrl: 'dummyLogoUrl1'
}

const gameRun = {
    videoUrl: 'dummyVideoUrl',
    playerName: 'dummyPlayerName',
    duration: 'PT15M7S'
}

const loadGameDetailMockAction = {type: 'loadGameDetail'};
loadGameDetail.mockReturnValue(loadGameDetailMockAction);
const resetGameRunsMockAction = {type: 'resetGameRuns'};
resetGameRuns.mockReturnValue(resetGameRunsMockAction);

const gameId = game.id;

const componentToTest =
    <Provider store={store}>
        <GameDetailContainer gameId={gameId} />
    </Provider>

beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
})

test("Component is unmounted. ResetGameRuns action.", () => {
    shouldLoadGames.mockReturnValue(false);
    shouldLoadGameRuns.mockReturnValue(false);
    getGameById.mockReturnValue(game);
    getLastGameRun.mockReturnValue(gameRun);

    const container = document.createElement('div');
    ReactDOM.render(componentToTest, container);
    ReactDOM.unmountComponentAtNode(container);
    expect(resetGameRuns).toHaveBeenCalledTimes(1);
    expect(resetGameRuns).toHaveBeenCalledWith();
    expect(store.getActions()).toContainEqual(resetGameRunsMockAction);
});

test("ShouldLoadGames returns true. Component is rendered. LoadGameDetail action should be dispatched.", () => {
    shouldLoadGames.mockReturnValue(true);
    shouldLoadGameRuns.mockReturnValue(false);
    getGameById.mockReturnValue(game);
    getLastGameRun.mockReturnValue(gameRun);

    const container = document.createElement('div');

    ReactDOM.render(componentToTest, container);
    expect(loadGameDetail).toHaveBeenCalledTimes(1);
    expect(loadGameDetail).toHaveBeenCalledWith(gameId);
    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(loadGameDetailMockAction);
});

test("ShouldLoadGameRuns returns true. Component is rendered. LoadGameDetail action should be dispatched.", () => {
    shouldLoadGames.mockReturnValue(false);
    shouldLoadGameRuns.mockReturnValue(true);
    getGameById.mockReturnValue(game);
    getLastGameRun.mockReturnValue(gameRun);

    const container = document.createElement('div');

    ReactDOM.render(componentToTest, container);
    expect(loadGameDetail).toHaveBeenCalledTimes(1);
    expect(loadGameDetail).toHaveBeenCalledWith(gameId);
    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(loadGameDetailMockAction);
});

test("ShouldLoadGames and shouldLoadGameRuns returns false. Component is rendered. LoadGameDetail action should not be dispatched.", () => {
    shouldLoadGames.mockReturnValue(false);
    shouldLoadGameRuns.mockReturnValue(false);
    getGameById.mockReturnValue(game);
    getLastGameRun.mockReturnValue(gameRun);

    const container = document.createElement('div');

    ReactDOM.render(componentToTest, container);
    expect(loadGameDetail).not.toHaveBeenCalled();
    expect(store.getActions()).toHaveLength(0);
});

test("GetGameById returns undefined. Snapshot.", () => {
    shouldLoadGames.mockReturnValue(false);
    shouldLoadGameRuns.mockReturnValue(false);
    getGameById.mockReturnValue(undefined);
    getLastGameRun.mockReturnValue(gameRun);

    const tree = renderer.create(componentToTest).toJSON();
    expect(tree).toMatchSnapshot();
});

test("GetLastGameRun returns undefined. Snapshot.", () => {
    shouldLoadGames.mockReturnValue(false);
    shouldLoadGameRuns.mockReturnValue(false);
    getGameById.mockReturnValue(game);
    getLastGameRun.mockReturnValue(undefined);

    const tree = renderer.create(componentToTest).toJSON();
    expect(tree).toMatchSnapshot();
});

test("GetGameById and getLastGameRun return valid values. Snapshot.", () => {
    shouldLoadGames.mockReturnValue(false);
    shouldLoadGameRuns.mockReturnValue(false);
    getGameById.mockReturnValue(game);
    getLastGameRun.mockReturnValue(gameRun);

    const tree = renderer.create(componentToTest).toJSON();
    expect(tree).toMatchSnapshot();
});

