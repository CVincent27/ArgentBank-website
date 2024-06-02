import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AccountCard from "../../Components/AccountCard/AccountCard";
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
        /* It's checking if the localUserToken is not null and if the userToken is null. If the
        localUserToken is not null and the userToken is null, it dispatches the fetchOrUpdateUser action. */
        if (localUserToken && !userToken) {
            dispatch(fetchOrUpdateUser(baseURL, localUserToken));
        }
    }, [localUserToken, userToken, dispatch, baseURL]);

    useEffect(() => {
        /* It's dispatching the fetchOrUpdateAccount action. */
        dispatch(fetchOrUpdateAccount);
    }, [dispatch]);

    useEffect(() => {
        /* It's checking if the isConnected state is false and if the localUserToken is null. If the
        isConnected state is false and the localUserToken is null, it redirects to the login page. */
        if (!isConnected && !localUserToken) {
            navigate("/login");
        }
    }, [isConnected, localUserToken, navigate]);


    if (userError !== null || accountError !== null) {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Error... </h1>
                    <h2>
                        {userError && "User data: " + userError.response.statusText} {accountError && "Account data: " + accountError.response.statusText}
                    </h2>
                </div>
            </main>
        );
    }

    if (userStatus !== "resolved" || accountStatus !== "resolved") {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Loading...</h1>
                </div>
            </main>
        );
    }

    if (userStatus === "rejected" || accountStatus === "rejected") {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Your request is rejected</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {userFirstName && userFirstName} {userLastName && userLastName}!
                </h1>
                <EditNameForm />
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accountData && accountData.account.map((account, index) => <AccountCard key={account.title + "-" + index} title={account.title} amount={account.amount} description={account.description} />)}
        </main>
    );
}

export default Profile;