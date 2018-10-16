import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from "./reducers";

const dev = process.env.NODE_ENV !== "production";

const middlewares = (dev) ? composeWithDevTools(applyMiddleware(thunkMiddleware)) : applyMiddleware(thunkMiddleware);

export default initialState =>
    createStore(reducers, initialState, middlewares);
