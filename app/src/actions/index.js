import {CURRENT_PAGE, LEAVE_PAGE, MS_ACTION, SOCKET_ACTION, SOCKET_CONNECT} from "./types";

export const socketConnectT = (host) => {
    console.log("connecting host", host)
    return {type: SOCKET_CONNECT, host}
}

export const disconnect = () => {
    console.log("disconnecting")
    return {type: SOCKET_CONNECT}
}

export const sendAction =(actionDetails)=> {
    return {type: SOCKET_ACTION, payload: actionDetails}
}

export const sendMsAction = (actionDetails) => {
    return {type: MS_ACTION, payload: actionDetails}
}

export const leavePage = (page) => {
    return {type: LEAVE_PAGE, payload: page}
}

export const updatePage = (page) => {
    return {type: CURRENT_PAGE, payload: page}
}