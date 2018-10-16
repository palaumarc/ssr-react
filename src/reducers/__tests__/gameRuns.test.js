import reducer from "../gameRuns";
import * as types from "../../actions/actionTypes";

describe("Game runs reducer", () => {
    const initialState = [];

    it("Should return initial state", () => {
        const expectedState = initialState;
        expect(reducer(undefined, {})).toEqual(expectedState);
    });

    it("should handle STORE_GAME_RUNS", () => {
        const beforeState = [];
        const action = {
            type: types.STORE_GAME_RUNS,
            payload: "dummyRuns"
        };
        const expectedState = "dummyRuns";
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });

    it("should handle RESET_GAME_RUNS", () => {
        const beforeState = [];
        const action = {
            type: types.RESET_GAME_RUNS
        };
        const expectedState = initialState;
        expect(reducer(beforeState, action)).toEqual(expectedState);
    });
});
