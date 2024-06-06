import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInService } from '../../redux/services/authService.jsx';
import { loginFailed, loginSuccess } from '../../redux/actions/auth.actions.jsx';
import { isValidEmail, isValidPassword } from '../../utils/regex.jsx';

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = useSelector((state) => state.auth.token)
  const error = useSelector((state) => state.auth.error)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Gestion erreur msg
    if (!isValidEmail(email)) {
      setErrorMessage("Votre email est mal formaté");
      return;
    }
    if (!isValidPassword(password)) {
      setErrorMessage("Votre mot de passe est mal formaté");
      return;
    }
    try {
      const data = await signInService(email, password);
      dispatch(loginSuccess(data));

    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
      if (rememberMe) {
        localStorage.setItem("token", token);
      }
      navigate("/user");
    }
    if (error) {
      console.log(error);
      setErrorMessage(error);
    }
  }, [token, rememberMe, navigate, error]);


  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
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
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button className="sign-in-button">Sign In</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

export default SignInForm;