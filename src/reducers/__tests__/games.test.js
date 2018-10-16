import reducer from "../games";
import * as types from "../../actions/actionTypes";

describe("Games reducer", () => {
    const initialState = [];

    it("Should return initial state", () => {
        const expectedState = initialState;
        expect(reducer(undefined, {})).toEqual(expectedState);
    });

    it("should handle STORE_GAMES", () => {
        const beforeState = [];
        const action = {
            type: types.STORE_GAMES,
            payload: "dummyGames"
        };
        const expectedState = "dummyGames";
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });
});