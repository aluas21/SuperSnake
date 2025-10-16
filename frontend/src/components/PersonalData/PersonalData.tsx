import React, {useState} from 'react';
import './PersonalData.css';
import { Phone } from 'lucide-react';
import { updateUser } from '../../services/api';

const PersonalData: React.FC = () => {
  const user = sessionStorage.getItem('user');
	const userData = user ? JSON.parse(user) : null;

	const [newFirstName, setNewFirstName] = useState(userData ? userData.firstName : '');
	const [newLastName, setNewLastName] = useState(userData ? userData.lastName : '');
	const [newUsername, setNewUsername] = useState(userData ? userData.username : '');
	const [newEmail, setNewEmail] = useState(userData ? userData.email : '');
	const [newDateOfBirth, setNewDateOfBirth] = useState(userData ? userData.dateOfBirth : '');
	const [newPhone, setNewPhone] = useState(userData ? userData.phone : '');

	const handleUpdateProfile = () => {
		// Here you would typically send the updated data to the server
		const updatedUserData = {
			...userData,
			firstName: newFirstName,
			lastName: newLastName,
			username: newUsername,
			email: newEmail,
			dateOfBirth: newDateOfBirth,
			phone: newPhone,
		};

		// For demonstration, we'll just log it and update sessionStorage
		const oldUsername = userData.username;
		console.log('Updated User Data:', userData.token);
		updateUser(oldUsername, updatedUserData, userData.token).then((response) => {
			if (response.ok) {
				alert('Profile updated successfully!');
				sessionStorage.setItem('user', JSON.stringify(updatedUserData));
			} else {
				alert(response.error);
			}
		});		
	}

	return (
		<div>
			<h2>Personal Data</h2>
			{userData ? (
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