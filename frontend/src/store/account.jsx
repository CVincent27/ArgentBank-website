import axios from "axios";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    status: "void",
    data: null,
    error: null,
};

const accountFetchingAction = createAction("account/fetching");
const accountResolvedAction = createAction("account/resolved");
const accountRejectedAction = createAction("account/rejected");


// Fonction pour récupérer ou mettre à jour les données de compte. (return result de disptatch)

export const fetchOrUpdateAccount = async (dispatch, getState) => {

    //  Si le statut du compte est pending ou updating, retourner.

    const selectAccount = (state) => state.account;
    const status = selectAccount(getState()).status;
    if (status === "pending" || status === "updating") {
        return;
    }

    dispatch(accountFetchingAction());
    /* Récupération data du compte */
    await axios
        .get(window.location.origin + "/account-data.json")
        .then((response) => {
            dispatch(accountResolvedAction(response.data));
        })
        .catch((error) => {
            dispatch(accountRejectedAction(error));
        });
};

/* Création du reducer */
export default createReducer(initialState, (builder) =>
    builder
        .addCase(accountFetchingAction, (draft) => {
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
            return;
        })
        .addCase(accountResolvedAction, (draft, action) => {
            if (draft.status === "pending" || draft.status === "updating") {
                draft.data = action.payload;
                draft.status = "resolved";
                return;
            }
            return;
        })
        .addCase(accountRejectedAction, (draft, action) => {
            if (draft.status === "pending" || draft.status === "updating") {
                draft.status = "rejected";
                draft.error = action.payload;
                draft.data = null;
                return;
            }
            return;
        })
);
