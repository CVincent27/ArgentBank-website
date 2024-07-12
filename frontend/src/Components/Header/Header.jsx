import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../../redux/actions/users.actions.jsx";
import { isValidName } from "../../utils/Regex.jsx";
import { updateUsernameService } from "../../redux/services/userService.jsx";

function Header() {
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const firstname = userData?.firstname || '';
  const lastname = userData?.lastname || '';
  const username = userData?.username || '';

  // gère l'apparition du formulaire de modif du nom du user
  const [display, setDisplay] = useState(true);
  //  obtenir le nom du user
  const [userName, setUserName] = useState(username);
  //  gère message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  //  fonction async màj du nom d'utilisateur
  const handleSubmitUsername = async (event) => {
    event.preventDefault();
    if (!isValidName(userName)) {
      setErrorMessage("Nom d'utilisateur invalide");
      return;
    } else {
      setErrorMessage("");
    }
    try {
      const newUsername = await updateUsernameService(token, userName);
      dispatch(updateUsername(newUsername));
      setDisplay(!display);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="header">
      {display ? (
        <div>
          <h1>
            Welcome back
            <br />
            {firstname} {lastname}
          </h1>

          <button className="edit-button" onClick={() => setDisplay(!display)}>
            Edit Name
          </button>
        </div>
      ) : (
        <div>
          <h2>Edit user info</h2>
          <form>
            <div className="edit-input">
              <label htmlFor="username">User name:</label>
              <input
                type="text"
                id="username"
                defaultValue={username}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="edit-input">
              <label htmlFor="firstname">First name:</label>
              <input
                type="text"
                id="firstname"
                defaultValue={firstname}
                disabled={true}
              />
            </div>
            <div className="edit-input">
              <label htmlFor="lastname">Last name:</label>
              <input
                type="text"
                id="lastname"
                defaultValue={lastname}
                disabled={true}
              />
            </div>
            <div className="buttons">
              <button
                className="edit-username-button"
                onClick={handleSubmitUsername}
              >
                Save
              </button>
              <button
                className="edit-username-button"
                onClick={() => setDisplay(!display)}
              >
                Cancel
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default Header;
