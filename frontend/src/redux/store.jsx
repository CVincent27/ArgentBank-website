import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../redux/reducers/auth.reducers.jsx';
import { userReducer } from '../redux/reducers/user.reducers.jsx';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
})

const store = configureStore({
    reducer: rootReducer,
    devTools: true
})

export default store