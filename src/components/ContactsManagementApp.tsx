import { Logout } from '@mui/icons-material';

import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { hasValidCookie } from '../utils/utils-utl';
import MyContacts from './home/MyContacts';
import Login from './login/Login';
import EditProfile from './profile/EditProfile';
import MyProfile from './profile/MyProfile';
import Register from './register/Register';
import Sidebar from './sidebar/Sidebar';

const ContactsManagementApp = () => {
	const isLoggedIn: boolean = hasValidCookie();

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/login"
					element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />}
				/>
				<Route
					path="/register"
					element={!isLoggedIn ? <Register /> : <Navigate to="/home" replace />}
				/>
				<Route
					path="/home"
					element={
						isLoggedIn ? (
							<>
								<Sidebar /> <MyContacts />
							</>
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>
				<Route
					path="/my-profile"
					element={
						isLoggedIn ? (
							<>
								<Sidebar /> <MyProfile />
							</>
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>
				<Route
					path="/edit-profile"
					element={
						isLoggedIn ? (
							<>
								<Sidebar /> <EditProfile />
							</>
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>
				<Route
					path="/logout"
					element={isLoggedIn ? <Logout /> : <Navigate to="/login" replace />}
				/>
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</BrowserRouter>
	);
};

export default ContactsManagementApp;
