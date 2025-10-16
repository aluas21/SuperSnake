import React, {useState} from 'react';
import './PersonalData.css';
import { updateUser } from '../../services/api';
import { User } from '../../types/userTypes';

const PersonalData: React.FC = () => {
  const userWithToken = sessionStorage.getItem('user');
	const user: User = {
		firstName: JSON.parse(userWithToken || "{}").firstName,
		lastName: JSON.parse(userWithToken || "{}").lastName,
		username: JSON.parse(userWithToken || "{}").username,
		email: JSON.parse(userWithToken || "{}").email,
		profilePicture: JSON.parse(userWithToken || "{}").profilePicture,
		phone: JSON.parse(userWithToken || "{}").phone,
		dateOfBirth: JSON.parse(userWithToken || "{}").dateOfBirth,
		userType: JSON.parse(userWithToken || "{}").userType,
	}
	const token = JSON.parse(userWithToken || "{}").token;

	const [newFirstName, setNewFirstName] = useState(user ? user.firstName : '');
	const [newLastName, setNewLastName] = useState(user ? user.lastName : '');
	const [newUsername, setNewUsername] = useState(user ? user.username : '');
	const [newEmail, setNewEmail] = useState(user ? user.email : '');
	const [newDateOfBirth, setNewDateOfBirth] = useState(user ? user.dateOfBirth : '');
	const [newPhone, setNewPhone] = useState(user ? user.phone : '');

	const handleUpdateProfile = () => {
		// Here you would typically send the updated data to the server
		const updatedUser: User = {
			...user,
			firstName: newFirstName,
			lastName: newLastName,
			username: newUsername,
			email: newEmail,
			dateOfBirth: newDateOfBirth,
			phone: newPhone,
			userType: user.userType,
		};

		// For demonstration, we'll just log it and update sessionStorage
		const oldUsername = user.username;
		updateUser(oldUsername, updatedUser, token).then((response) => {
			if (response.ok) {
				alert('Profile updated successfully!');
				sessionStorage.setItem('user', JSON.stringify({ ...updatedUser, token }));
			} else {
				alert(response.error);
			}
		});		
	}

	return (
		<div>
			<h2>Personal Data</h2>
			{user ? (
				<div className="personal-data">
					<div className="personal-data__item">
						<label>First Name:</label>
						<input type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
					</div>
					<div className="personal-data__item">
						<label>Last Name:</label>
						<input type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
					</div>
					<div className="personal-data__item">
						<label>Username:</label>
						<input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
					</div>
					<div className="personal-data__item">
						<label>Email:</label>
						<input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
					</div>
					<div className="personal-data__item">
						<label>Date of Birth:</label>
						<input type="date" value={newDateOfBirth} onChange={(e) => setNewDateOfBirth(e.target.value)} />
					</div>
					<div className="personal-data__item">
						<label>Phone:</label>
						<input type="tel" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
					</div>

					<button className="personal-data__update-button" onClick={handleUpdateProfile}>Update Profile</button>

				</div>
			) : (

				<p>No user data available</p>
			)}
		</div>
	);
}

export default PersonalData;