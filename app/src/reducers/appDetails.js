import {CURRENT_PAGE, GENERAL, LEAVE_PAGE, ROOM_JOINED, SOCKET_CONNECTED} from "../actions/types";

export default (state={currentPage: 'climate', general: {dark: false, gear: "park"}}, action) => {
    switch(action.type) {
        case SOCKET_CONNECTED:
            return {...state, connected: action.payload}
        case ROOM_JOINED:
            return {...state, currentPage: action.payload}
        case GENERAL:
            return {...state, general: action.payload}
        default:
            return state
    }
}