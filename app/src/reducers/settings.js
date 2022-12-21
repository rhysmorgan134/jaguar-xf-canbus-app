import {SOCKET_DIAG, SOCKET_SETTINGS} from "../actions/types";


export default (state={bools:{}}, action) => {
    switch(action.type) {

        case SOCKET_SETTINGS:
            return {...state, bools: action.payload};
        default:
            return state
    }
}