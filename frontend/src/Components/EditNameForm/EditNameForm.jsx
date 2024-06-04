import { useEffect, useState } from "react";

import { modifyUserName } from "../../store/user";

import { selectBaseURL, selectUserToken, selectUserFirstName, selectUserLastName } from "../../store/selectors";

import { useDispatch, useSelector } from "react-redux";

import "../EditNameForm/style.css";

function EditNameForm() {
	const dispatch = useDispatch();

	const baseURL = useSelector(selectBaseURL());
	const userToken = useSelector(selectUserToken());
	const userFirstName = useSelector(selectUserFirstName());
	const userLastName = useSelector(selectUserLastName());

	const [newFirstName, setNewFirstName] = useState(null);
	const [newLastName, setNewLastName] = useState(null);
	const [showEditNameForm, setShowEditNameForm] = useState(false);
	const [editNameFormError, setEditNameFormError] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		// check si nom / prénoms ont changés
		if (newFirstName === userFirstName && newLastName === userLastName) {
			setEditNameFormError("FirstName and LastName are the same as the current ones.");
		}
		// check si nom / prénoms sont vides
		else if (newFirstName.length === 0 || newLastName.length === 0) {
			setEditNameFormError("Inputs can't be empty");
		}
		// check si nom / prénoms sont trop longs
		else if (newFirstName.length > 0 && newLastName.length > 0) {
			dispatch(modifyUserName(baseURL, userToken, newFirstName, newLastName));
			setShowEditNameForm(false);
			setEditNameFormError("");
		}
	};


	// defini état showEditNameForm (quand cliqué)
	const toggleEditNameForm = () => {
		showEditNameForm ? setShowEditNameForm(false) : setShowEditNameForm(true);
	};

	useEffect(() => {
		// set les nouveaux prénoms et noms
		setNewFirstName(userFirstName);
		setNewLastName(userLastName);
	}, [userFirstName, userLastName]);

	return (
		<div>
			{!showEditNameForm && (
				<button className="edit-button" onClick={toggleEditNameForm}>
					Edit Name
				</button>
			)}
			{showEditNameForm && (
				<form className="new-name-form" onSubmit={handleSubmit}>
					<div className="input-group">
						<div className="input-wrapper">
							<label className="hidden" htmlFor="firstname">
								Firstname
							</label>
							<input type="text" id="firstname" onChange={(e) => setNewFirstName(e.target.value)} value={newFirstName} />
						</div>
						<div className="input-wrapper">
							<label className="hidden" htmlFor="lastname">
								Lastname
							</label>
							<input type="text" id="lastname" onChange={(e) => setNewLastName(e.target.value)} value={newLastName} />
						</div>
					</div>
					<div className="input-group input-center">
						<button type="submit" className="edit-button">
							Save
						</button>
						<button className="edit-button" onClick={toggleEditNameForm}>
							Cancel
						</button>
					</div>
					<div className="input-group input-center">{editNameFormError && <div className="input-new-names input-error">{editNameFormError}</div>}</div>
				</form>
			)}
		</div>
	);
}

export default EditNameForm;