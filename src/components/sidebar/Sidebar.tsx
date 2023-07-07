import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import Cookies from 'js-cookie';
import * as React from 'react';
import { Props as BurgerProps, slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import logo from '../../images/contacts.png';
import './Sidebar.css';

const Sidebar = (props: BurgerProps) => {
	return (
		<>
			<Menu right width={400} {...props}>
				<div className="logo">
					<img src={logo} width={100} height={100} alt="logo" />
					<h3 className="sidebar-app-name">
						Contact
						<br />
						Management
					</h3>
				</div>
				<Link to="/home">
					<AccountCircleIcon fontSize="medium"></AccountCircleIcon>
					&nbsp; My Contacts (Home)
				</Link>
				<Link to="/my-profile">
					<AccountCircleIcon fontSize="medium"></AccountCircleIcon>
					&nbsp; My Profile
				</Link>
				<Link to="/edit-profile">
					<ManageAccountsIcon fontSize="medium"></ManageAccountsIcon>
					&nbsp; Edit Profile
				</Link>
				<Link
					to="#"
					onClick={() => {
						Cookies.remove('login_session');
						location.reload();
					}}
				>
					<LogoutIcon fontSize="medium"></LogoutIcon>
					&nbsp; Logout
				</Link>
			</Menu>
			<br />
			<br />
			<br />
		</>
	);
};

export default Sidebar;
