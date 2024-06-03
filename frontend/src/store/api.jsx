import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    baseURL: "http://localhost:3001/api/v1",
};

/* Création du reducer */
export default createReducer(initialState, (builder) => builder);