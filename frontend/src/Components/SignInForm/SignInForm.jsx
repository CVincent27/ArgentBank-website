import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginSuccess } from '../../redux/actions/auth.actions.jsx';
import { isValidEmail, isValidPassword } from '../../utils/regex.jsx';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Gere les messages d'erreurs
    if (!isValidEmail(email)) {
      setErrorMessage("Adresse e-mail invalide");
      return;
    }
    if (!isValidPassword(password)) {
      setErrorMessage("Mot de passe invalide");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();

        //  check si le token est bien récupéré
        //  console.log(data) 
        const token = data.body.token;
        dispatch(loginSuccess(token));
        sessionStorage.setItem("token", token);
        if (rememberMe) {
          localStorage.setItem("token", token);
        }
        navigate('/user');
      } else {
        const error = "Email/mot de passe incorrect";
        dispatch(loginFailed(error));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        <label htmlFor="remember-me">Se souvenir de moi</label>
      </div>

      <button className="sign-in-button">
        Se connecter
      </button>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </form>
  );
}

export default SignInForm;
