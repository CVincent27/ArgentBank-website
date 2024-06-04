import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Account from "../../Components/Account/Account";
import EditNameForm from "../../Components/EditNameForm/EditNameForm";

import { fetchOrUpdateAccount } from "../../store/account";
import { fetchOrUpdateUser } from "../../store/user";

import { getWithExpiry } from "../../utils/withExpiry";

import {
    selectBaseURL,
    selectIsConnected,
    selectUserToken,
    selectUserStatus,
    selectUserError,
    selectUserId,
    selectUserFirstName,
    selectUserLastName,
    selectAccountStatus,
    selectAccountError,
    selectUserAccountData,
} from "../../store/selectors";

import { useDispatch, useSelector } from "react-redux";

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const localUserToken = getWithExpiry("userToken");

    const baseURL = useSelector(selectBaseURL());
    const isConnected = useSelector(selectIsConnected());
    const userToken = useSelector(selectUserToken());
    const userStatus = useSelector(selectUserStatus());
    const userError = useSelector(selectUserError());
    const userId = useSelector(selectUserId());
    const userFirstName = useSelector(selectUserFirstName());
    const userLastName = useSelector(selectUserLastName());
    const accountStatus = useSelector(selectAccountStatus());
    const accountError = useSelector(selectAccountError());
    const accountData = useSelector(selectUserAccountData(userId));

    useEffect(() => {
        // Vérifie si le localUserToken n'est pas null et si le userToken = null. si oui déclenche fetchOrUpdateUser.
        if (localUserToken && !userToken) {
            dispatch(fetchOrUpdateUser(baseURL, localUserToken));
        }
    }, [localUserToken, userToken, dispatch, baseURL]);

    useEffect(() => {
        // Déclenche fetchOrUpdateAccount.
        dispatch(fetchOrUpdateAccount);
    }, [dispatch]);

    useEffect(() => {
        // Redirige vers la page de connexion si l'utilisateur n'est pas connecté et que le localUserToken est null.
        if (!isConnected && !localUserToken) {
            navigate("/login");
        }
    }, [isConnected, localUserToken, navigate]);

    if (userError !== null || accountError !== null) {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Erreur... </h1>
                    <h2>
                        {userError && "Données utilisateur : " + userError.response.statusText} {accountError && "Données du compte : " + accountError.response.statusText}
                    </h2>
                </div>
            </main>
        );
    }

    if (userStatus !== "resolved" || accountStatus !== "resolved") {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Chargement...</h1>
                </div>
            </main>
        );
    }

    if (userStatus === "rejected" || accountStatus === "rejected") {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Votre demande est rejetée</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Bon retour
                    <br />
                    {userFirstName && userFirstName} {userLastName && userLastName}!
                </h1>
                <EditNameForm />
            </div>
            <h2 className="sr-only">Comptes</h2>
            {accountData && accountData.account.map((account, index) => <Account key={account.title + "-" + index} title={account.title} amount={account.amount} description={account.description} />)}
        </main>
    );
}

export default Profile;
