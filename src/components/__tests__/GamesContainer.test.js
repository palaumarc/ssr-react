import React from "react";
import ReactDOM from "react-dom";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from "react-test-renderer";
import GamesContainer from "../GamesContainer";
import reduxThunk from 'redux-thunk';
import {
    shouldLoadGames,
    getGames
} from "../../reducers";

import {
    fetchGames
} from "../../actions"

jest.mock("../../reducers");
jest.mock("../../actions");
jest.mock("../Games", () => 'games-mock');

const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares);

//We don't fill store's state as we will mock selectors directly
const state = {};
const store = mockStore(state);

const game1 = {
    id: '1',
    name: 'dummyName1',
    logoUrl: 'dummyLogoUrl1'
}

const game2 = {
    id: '2',
    name: 'dummyName2',
    logoUrl: 'dummyLogoUrl2'
}

const games = [game1, game2];
const fetchGamesMockAction = {type: 'fetchGames'};
fetchGames.mockReturnValue(fetchGamesMockAction);

beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
})

test("ShouldLoadGames returns true. Component is rendered. FetchGames action should be dispatched.", () => {
    shouldLoadGames.mockReturnValue(true);
    getGames.mockReturnValue([]);

    const container = document.createElement('div');

    const componentToTest =
        <Provider store={store}>
            <GamesContainer />
        </Provider>

    ReactDOM.render(componentToTest, container);
    expect(fetchGames).toHaveBeenCalledTimes(1);
    expect(fetchGames).toHaveBeenCalledWith();
    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(fetchGamesMockAction);
});

test("ShouldLoadGames returns false. Component is rendered. FetchGames action should not be dispatched.", () => {
    shouldLoadGames.mockReturnValue(false);
    getGames.mockReturnValue([]);

    const container = document.createElement('div');

    const componentToTest =
        <Provider store={store}>
            <GamesContainer />
        </Provider>

    ReactDOM.render(componentToTest, container);
    expect(fetchGames).not.toHaveBeenCalled();
    expect(store.getActions()).toHaveLength(0);
});

test("GetGames returns an array with 2 valid objects. Snapshot.", () => {
    shouldLoadGames.mockReturnValue(false);
    getGames.mockReturnValue(games);

    const componentToTest =
        <Provider store={store}>
            <GamesContainer />
        </Provider>

    const tree = renderer.create(componentToTest).toJSON();
    expect(tree).toMatchSnapshot();
});

test("GetGames returns an empty array. Snapshot.", () => {
    shouldLoadGames.mockReturnValue(false);
    getGames.mockReturnValue([]);

    const componentToTest =
        <Provider store={store}>
            <GamesContainer />
        </Provider>

    const tree = renderer.create(componentToTest).toJSON();
    expect(tree).toMatchSnapshot();
});

