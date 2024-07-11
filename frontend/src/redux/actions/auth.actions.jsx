import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./type.actions";

// Action d'authentification
export const loginSuccess = (token) => {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_SUCCESS,
        payload: token,
    }
}

export const loginFailed = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error,
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: LOGOUT,
    }
}
