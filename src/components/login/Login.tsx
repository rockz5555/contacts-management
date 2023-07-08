import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
	Alert,
	Avatar,
	Box,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid,
	LinearProgress,
	TextField,
	ThemeProvider,
} from '@mui/material';
import Button from '@mui/material/Button';

import axios from 'axios';
import Cookies from 'js-cookie';
import * as React from 'react';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { API_URL, LOCAL_STORAGE_USER_EMAIL_KEY } from '../../shared/constants';
import { hasAValidCookie } from '../../utils/cookie-util';
import { defaultTheme } from '../../utils/get-theme';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event: BaseSyntheticEvent): Promise<void> => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const email = data.get('email');
		const password = data.get('password');

		setLoading(true);
		try {
			const response = await axios.post(`${API_URL}/auth/login`, {
				email,
				password,
			});

			if (response.status === 200) {
				if (rememberMe) {
					const expires = new Date();
					expires.setDate(365);

					Cookies.set('login_session', 'OK', {
						path: '/',
						expires,
					});
				} else {
					Cookies.set('login_session', 'OK', { path: '/' });
				}
				localStorage.setItem(LOCAL_STORAGE_USER_EMAIL_KEY, email as string);
				setError('');
				location.reload();
			} else {
				setError(response.data.message);
			}
		} catch (error: any) {
			setError(error.response.data.message);

			console.error('An error occurred during login:', error);
		} finally {
			setLoading(false);
		}
	};

	const hasInputValidated = (): boolean => {
		return (userId.length && password.length) > 0;
	};

	useEffect(() => {
		if (hasAValidCookie()) {
			navigate('/home');
		}
	}, [navigate]);

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
						<LockOutlinedIcon />
					</Avatar>
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="User ID"
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
						<FormControlLabel
							control={
								<Checkbox
									value="remember"
									color="primary"
									onChange={(e) => setRememberMe(e.target.value as any)}
								/>
							}
							label="Keep me logged in"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="info"
							disabled={loading || !hasInputValidated()}
							sx={{ mt: 3, mb: 2 }}
						>
							{loading ? 'Logging In, Please wait...' : 'Login'}
						</Button>
						<Grid container>
							No account? &nbsp;
							<Grid item>
								<Link to={'/register'}>Register here</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
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
			</Container>
		</ThemeProvider>
	);
};

export default Login;
