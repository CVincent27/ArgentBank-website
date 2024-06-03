import axios from "axios";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
	status: "void",
	error: null,
	isConnected: false,
	token: null,
	id: null,
	email: null,
	firstName: null,
	lastName: null,
	createdAt: null,
	updatedAt: null,
};

const userFetchingAction = createAction("user/fetching");
const userResolvedAction = createAction("user/resolved");
const userRejectedAction = createAction("user/rejected");

export const isConnectedAction = createAction("user/isConnected");
export const userTokenAction = createAction("user/token");
export const userResetAction = createAction("user/reset");

/**
 * Verif userToken et stocker les userData.
 */
export const fetchOrUpdateUser = (baseURL, token) => {
	return async (dispatch, getState) => {
		/**
		 * Si le statut de l'utilisateur est pending ou updating on return.
		 */
		const selectUser = (state) => state.user;
		const status = selectUser(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}

		dispatch(userFetchingAction());
		/* Requête POST pour obtenir les userData. */
		await axios({
			method: "POST",
			url: baseURL + "/user/profile",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => {
				dispatch(userResolvedAction(response.data));
				dispatch(userTokenAction(token));
				dispatch(isConnectedAction(true));
			})
			.catch((error) => {
				dispatch(userRejectedAction(error));
			});
	};
};

export const modifyUserName = (baseURL, token, firstname, lastname) => {
	return async (dispatch, getState) => {
		/**
		 * Si le statut de l'utilisateur est pending ou updating on return.
		 */
		const selectUser = (state) => state.user;
		const status = selectUser(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}

		dispatch(userFetchingAction());
		/* Requête PUT pour modifier firstname et lastname */
		axios({
			method: "PUT",
			url: baseURL + "/user/profile",
			headers: { Authorization: `Bearer ${token}` },
			data: {
				firstName: firstname,
				lastName: lastname,
			},
		})
			.then((response) => {
				dispatch(userResolvedAction(response.data));
			})
			.catch((error) => {
				dispatch(userRejectedAction(error));
			});
	};
};

/* Création du reducer user */
export default createReducer(initialState, (builder) =>
	builder
		.addCase(userFetchingAction, (draft) => {
			if (draft.status === "void") {
				draft.status = "pending";
				return;
			}
			if (draft.status === "rejected") {
				draft.error = null;
				draft.status = "pending";
				return;
			}
			if (draft.status === "resolved") {
				draft.status = "updating";
				return;
			}
		})
		.addCase(userResolvedAction, (draft, action) => {
			if (draft.status === "pending" || draft.status === "updating") {
				draft.id = action.payload.body.id;
				draft.email = action.payload.body.email;
				draft.firstName = action.payload.body.firstName;
				draft.lastName = action.payload.body.lastName;
				draft.createdAt = action.payload.body.createdAt;
				draft.updatedAt = action.payload.body.updatedAt;
				draft.status = "resolved";
			}
		})
		.addCase(userRejectedAction, (draft, action) => {
			if (draft.status === "pending" || draft.status === "updating") {
				draft.status = "rejected";
				draft.error = action.payload;
				Object.assign(draft, initialState);
			}
		})
		.addCase(isConnectedAction, (draft, action) => {
			draft.isConnected = action.payload;
		})
		.addCase(userTokenAction, (draft, action) => {
			draft.token = action.payload;
		})
		.addCase(userResetAction, (draft) => {
			Object.assign(draft, initialState);
			localStorage.removeItem("userToken");
		})
);
