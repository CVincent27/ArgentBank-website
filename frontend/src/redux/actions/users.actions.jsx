import { GET_USERPROFILE, EDIT_USERNAME } from "./type.actions";

// action recup data
export const userProfile = (userData) => {
    return {
        type: GET_USERPROFILE,
        payload: userData,
    }
}

// action update username
export const updateUsername = (username) => {
    return {
        type: EDIT_USERNAME,
        payload: username,
    }
}