import AppRegistrationOutlined from '@mui/icons-material/AppRegistrationOutlined';
import {
	Alert,
	Avatar,
	Box,
	Container,
	CssBaseline,
	Grid,
	LinearProgress,
	TextField,
	ThemeProvider,
} from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

import * as React from 'react';
import { BaseSyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { API_URL } from '../../shared/constants';
import { defaultTheme } from '../../utils/get-theme';

const Register = () => {
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [registerSuccess, setRegisterSuccess] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (event: BaseSyntheticEvent): Promise<void> => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const email = data.get('email');
		const password = data.get('password');

		setLoading(true);
		try {
			const response = await axios.post(`${API_URL}/auth/register`, {
				email,
				password,
			});

			if (response.status === 201) {
				setError('');
				setRegisterSuccess(response.data.message);
			}
		} catch (error: any) {
			setError(error.response.data.message);
			setRegisterSuccess('');

			console.error('An error occurred during register:', error);
		} finally {
			setLoading(false);
		}
	};

	const hasInputValidated = (): boolean => {
		return (
			(userId.length && password.length && confirmPassword.length) > 0 &&
			password === confirmPassword
		);
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs" sx={{ marginTop: 15 }}>
				<CssBaseline />

				{loading && (
					<LinearProgress
						sx={{
							height: 4,
							top: 10,
						}}
					/>
				)}

				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<h1 className="welcome-text">
						Welcome to <span>Contact Management</span>
					</h1>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<AppRegistrationOutlined />
					</Avatar>
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="User ID"
							type="email"
							name="email"
							autoComplete="email"
							onChange={(e) => setUserId(e.target.value)}
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="confirm-password"
							label="Confirm Password"
							type="password"
							id="confirm-password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="info"
							disabled={loading || !hasInputValidated()}
							sx={{ mt: 3, mb: 2 }}
						>
							{loading ? 'Registering, Please wait...' : 'Register'}
						</Button>
						<Grid container>
							Got an account? &nbsp;
							<Grid item>
								<Link to={'/login'}>Login here</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				{!!password.length &&
					!!confirmPassword.length &&
					password !== confirmPassword && (
					<Alert
						variant="filled"
						severity="error"
						icon=" "
						sx={{
							marginTop: 5,
						}}
					>
							Your passwords do not match
					</Alert>
				)}

				{error && (
					<Alert
						variant="filled"
						severity="error"
						icon=" "
						sx={{
							marginTop: 5,
						}}
					>
						{error}
					</Alert>
				)}

				{registerSuccess && (
					<Alert
						variant="filled"
						severity="success"
						icon=" "
						sx={{
							marginTop: 5,
						}}
					>
						{registerSuccess}
					</Alert>
				)}
			</Container>
		</ThemeProvider>
	);
};

export default Register;
