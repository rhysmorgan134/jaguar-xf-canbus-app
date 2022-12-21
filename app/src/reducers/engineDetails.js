import {SOCKET_DIAG, SOCKET_ENGINE, SOCKET_TRIP} from "../actions/types";

export default (state={trip: {coolant: 0, speed:0, revs: 0, oil: 0}, diag: {batteryVoltage: 0, alternatorCurrent: 0, chargingCurrent: 0, coolant:0, speed:0, revs:0 }, engine:{coolant: 0, oil: 0, speed: 0, revs: 0}}, action) => {
    switch(action.type) {
        case SOCKET_ENGINE:
            return {...state, engine: action.payload};
        case SOCKET_TRIP:
            return {...state, trip: action.payload};
        case SOCKET_DIAG:
            return {...state, diag: action.payload}
        default:
            return state
    }
}