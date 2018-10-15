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