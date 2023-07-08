import {
	Alert,
	Avatar,
	Card,
	CardContent,
	FormControl,
	Grid,
	InputLabel,
	LinearProgress,
	MenuItem,
	Pagination,
	Select,
	Tooltip,
	Typography,
} from '@mui/material';

import axios from 'axios';
import React, {
	BaseSyntheticEvent,
	Fragment,
	useEffect,
	useState,
} from 'react';

import { UserInterface } from '../../shared/user.interface';

const itemsPerPage = 9;

const MyContacts = () => {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [error, setError] = useState('');
	const [selectedGender, setSelectedGender] = useState('');
	const [selectedCountry, setSelectedCountry] = useState('');
	const [filteredCount, setFilteredCount] = useState(0);

	useEffect(() => {
		fetchUsers().then();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await axios.get(
				'https://randomuser.me/api/?results=100'
			);
			const users = response.data.results.map((user: any) => ({
				profileImageUrl: user.picture.large,
				fullName: `${user.name.first} ${user.name.last}`,
				email: user.email,
				mobile: user.phone,
				address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}`,
				gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
				country: user.location.country,
			}));

			setItems(users);
			setFilteredCount(users.length);
			setLoading(false);
			setError('');
		} catch (error) {
			console.error('Error fetching users:', error);
			setLoading(false);
			setError(`Error fetching users: ${error}`);
		}
	};

	const handlePageChange = (event: BaseSyntheticEvent, value: number) => {
		setPage(value);
	};

	const handleGenderChange = (event: any) => {
		setSelectedGender(event.target.value as string);
		setPage(1);
	};

	const handleCountryChange = (event: any) => {
		setSelectedCountry(event.target.value as string);
		setPage(1);
	};

	const startIndex: number = (page - 1) * itemsPerPage;
	const endIndex: number = page * itemsPerPage;
	const filteredItems: UserInterface[] = items.filter((item: UserInterface) => {
		if (selectedGender && item.gender !== selectedGender) {
			return false;
		}
		return !(selectedCountry && item.country !== selectedCountry);
	});
	const paginatedItems: UserInterface[] = filteredItems.slice(
		startIndex,
		endIndex
	);

	useEffect(() => {
		setFilteredCount(filteredItems.length);
	}, [filteredItems]);

	return (
		<Fragment>
			{loading && (
				<LinearProgress
					sx={{
						height: 4,
					}}
				/>
			)}

			<div style={{ margin: '0 20px' }}>
				<h1 className="nav-title">
					My <span>Contacts</span>
				</h1>

				{error && (
					<Alert
						severity="error"
						sx={{ textAlign: 'center', justifyContent: 'center' }}
					>
						{error}
					</Alert>
				)}

				<Grid
					container
					spacing={2}
					justifyContent="flex-end"
					marginBottom="15px"
				>
					<Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>Gender</InputLabel>
							<Select
								value={selectedGender}
								onChange={handleGenderChange}
								label="Gender"
								variant="standard"
								MenuProps={{ style: { maxHeight: '300px' } }}
							>
								<MenuItem value="">All</MenuItem>
								{Array.from(
									new Set(items.map((item: UserInterface) => item.gender))
								).map((gender, index) => (
									<MenuItem key={index} value={gender}>
										{gender}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>Country</InputLabel>
							<Select
								value={selectedCountry}
								onChange={handleCountryChange}
								label="Country"
								variant="standard"
								MenuProps={{ style: { maxHeight: '300px' } }}
							>
								<MenuItem value="">All</MenuItem>
								{Array.from(
									new Set(
										items
											.sort((x: { country: string }, y: { country: string }) =>
												x.country > y.country ? 1 : -1
											)
											.map((item: UserInterface) => item.country)
									)
								).map((country, index) => (
									<MenuItem key={index} value={country}>
										{country}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					{paginatedItems.map((item: UserInterface, index: number) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<Card
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.4)',
								}}
							>
								<CardContent
									sx={{
										height: '160px',
									}}
								>
									<Grid container spacing={2} alignItems="center">
										<Grid item>
											<Avatar
												alt={item.fullName}
												src={item.profileImageUrl}
												variant="square"
												sx={{
													width: 125,
													height: 125,
												}}
											/>
										</Grid>
										<Grid item xs={6} container>
											<Typography
												variant="body2"
												component="div"
												fontWeight="bold"
											>
												{item.fullName}
											</Typography>
											<Tooltip title={item.email} placement="top">
												<a
													href={`mailto:${item.email}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Typography
														variant="body2"
														color="text.secondary"
														component="span"
														style={{ textDecoration: 'underline' }}
														sx={{
															display: 'inline-block',
															maxWidth: '175px',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
															whiteSpace: 'nowrap',
														}}
													>
														{item.email}
													</Typography>
												</a>
											</Tooltip>
											<br />
											<a
												href={`tel:${item.mobile}`}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Typography
													variant="body2"
													color="text.secondary"
													component="span"
												>
													{item.mobile}
												</Typography>
											</a>
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{
													maxHeight: '3em',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													display: '-webkit-box',
													WebkitLineClamp: 3,
													WebkitBoxOrient: 'vertical',
												}}
											>
												{item.address}
											</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
				{!loading && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							paddingTop: '55px',
							paddingBottom: '55px',
						}}
					>
						<Pagination
							count={Math.ceil(filteredCount / itemsPerPage)}
							page={page}
							onChange={handlePageChange}
							variant="outlined"
							size="large"
							shape="rounded"
						/>
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default MyContacts;
