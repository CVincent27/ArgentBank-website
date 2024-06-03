import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchOrUpdateLogin } from "../../store/login";

import { selectLoginError, selectIsConnected, selectBaseURL } from "../../store/selectors";

import { getWithExpiry } from "../../utils/withExpiry";

import { useDispatch, useSelector } from "react-redux";


function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const localUserToken = getWithExpiry("userToken");
	const localUserEmail = localStorage.getItem("userEmail");

	const baseURL = useSelector(selectBaseURL());
	const loginError = useSelector(selectLoginError());
	const isConnected = useSelector(selectIsConnected());

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	/**
	 * Soumission form: sauvegarde ou supprime l'email selon la case cochée et envoie la requête de connexion.
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();
		rememberMe ? localStorage.setItem("userEmail", email) : localStorage.removeItem("userEmail");
		dispatch(fetchOrUpdateLogin(baseURL, email, password));
	};

	/**
	 * gestion clic sur la case RememberMe.
	 */
	const handleRememberMe = () => {
		setRememberMe(!rememberMe);
	};

	useEffect(() => {
		/* Redirige vers /profile si l'utilisateur est connecté. */
		if (localUserToken || (isConnected && loginError === null)) {
			navigate("/profile");
		}
		/* Rempli auto l'email si RememberMe est coché */
		if (localUserEmail) {
			setRememberMe(true);
			setEmail(localUserEmail);
		}
	}, [localUserToken, isConnected, loginError, dispatch, navigate, localUserEmail, setEmail]);

	return (
		<main>
			<div className="main bg-dark">
				<section className="sign-in-content">
					<i className="fa fa-user-circle sign-in-icon"></i>
					<h1>Se connecter</h1>
					<form onSubmit={handleSubmit}>
						<div className="input-wrapper">
							<label htmlFor="username">Nom d'utilisateur</label>
							<input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className="input-wrapper">
							<label htmlFor="password">Mot de passe</label>
							<input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
						</div>
						<div className="input-remember">
							<input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMe} />
							<label htmlFor="remember-me">Se souvenir de moi</label>
						</div>

						<button type="submit" className="sign-in-button">
							Se connecter
						</button>
						{loginError && <div className="input-remember input-error">{loginError.response.data.message}</div>}
					</form>
				</section>
			</div>
		</main>
	);
}

export default Login;
