import React from 'react';
import Header from '../../components/Header/Header';
import UserIcon from '../../assets/user-icon.png';
import './Profile.css';


const Profile: React.FC = () => {
  return (
		<>
			<Header pageTitle="Profile" />
			<div className="profile-content">
				<div className="profile-sidebar">
					<div className="profile-picture">
						<img src={UserIcon} alt="Profile picture" />
					</div>
					<button className="profile-action">Change Picture</button>
					<button className="profile-action">Change Password</button>
				</div>

				<div className="profile-menu">
					<button className="menu-button">Personal Data</button>
					<button className="menu-button">Inventory</button>
					<button className="menu-button">Friends</button>
					<button className="menu-button">Games Archive</button>
				</div>

				<div className="profile-info-panel">
					<h2>Personal Data</h2>
					<p>This section will update based on selected menu option.</p>
				</div>
			</div>
		</>
  );
}

export default Profile;