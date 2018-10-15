import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const reducer = (state = [], action) => state;

export default ( initialState ) =>
    createStore( reducer, initialState, applyMiddleware( thunkMiddleware ) );
