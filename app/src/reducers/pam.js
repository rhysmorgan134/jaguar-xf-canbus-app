import {SOCKET_PAM} from "../actions/types";

export default (state={pam: {frontLeft: 0, frontLeftMiddle: 0, frontRightMiddle: 0, frontRight: 0, rearLeft: 0, rearLeftMiddle: 0, rearRightMiddle: 0, rearRight: 0, active: false}}, action) => {
    switch(action.type) {
        case SOCKET_PAM:
            return {...state, pam: action.payload};
        default:
            return state
    }
}