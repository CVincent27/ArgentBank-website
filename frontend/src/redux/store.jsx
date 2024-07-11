import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../redux/reducers/auth.reducers.jsx';
import { userReducer } from '../redux/reducers/user.reducers.jsx';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
})

const preloadedState = {
    auth: {
        isConnected: !!localStorage.getItem('token'),
        token: localStorage.getItem('token'),
    },
    user: {}
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: true
})

export default store;
