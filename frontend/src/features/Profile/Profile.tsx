import React, {useRef, useState} from 'react';
import Header from '../../components/Header/Header';
import UserIcon from '../../assets/user-icon.png';
import { User } from '../../types/userTypes';
import './Profile.css';
import { changeProfilePicture } from '../../services/api';
import PersonalData from '../../components/PersonalData/PersonalData';
import Inventory from '../../components/Inventory/Inventory';
import Friends from '../../components/Friends/Friends';
import GamesArchive from '../../components/GamesArchive/GamesArchive'

const Profile: React.FC = () => {
	const user: User = JSON.parse(sessionStorage.getItem("user") || "{}");
	const profilePicture = user.profilePicture || UserIcon;

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handlePictureChange = () => {
		const file = fileInputRef.current?.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onloadend = (e) => {
			const base64String = reader.result as string;
			console.log('Selected file in base64:', base64String);

			user.profilePicture = base64String;
			sessionStorage.setItem("user", JSON.stringify(user));
			window.location.reload();
			
			changeProfilePicture(user.username, user.profilePicture, user.token).then((response) => {
				if (response.ok) {
					console.log('Profile picture updated successfully');
				} else {
					alert(response.error);
				}
			});
		}
		reader.readAsDataURL(file);
	}

	const handleFileSelection = () => {
		fileInputRef.current?.click();
	}

	const [infoPanelName, setInfoPanelName] = useState("Personal Data");

  return (
		<>
			<Header pageTitle="Profile" />
			<div className="profile-content">
				<div className="profile-sidebar">
					<div className="profile-picture">
						<img src={profilePicture} alt="Profile picture" />
					</div>
					<button className="profile-action" onClick={handleFileSelection}>Change Picture</button>
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						style={{ display: 'none' }}
						onChange={handlePictureChange}
					/>
					<button className="profile-action">Change Password</button>
				</div>

				<div className="profile-menu">
					<button className="menu-button" onClick={() => setInfoPanelName("Personal Data")}>Personal Data</button>
					<button className="menu-button" onClick={() => setInfoPanelName("Inventory")}>Inventory</button>
					<button className="menu-button" onClick={() => setInfoPanelName("Friends")}>Friends</button>
					<button className="menu-button" onClick={() => setInfoPanelName("Games Archive")}>Games Archive</button>
				</div>

				<div className="profile-info-panel">
					{infoPanelName === "Personal Data" && (
						<PersonalData />
					)}
					{infoPanelName === "Inventory" && (
						<Inventory />
					)}
					{infoPanelName === "Friends" && (
						<Friends />
					)}	
					{infoPanelName === "Games Archive" && (
						<GamesArchive />
					)}
				</div>
			</div>
		</>
  );
}

export default Profile;