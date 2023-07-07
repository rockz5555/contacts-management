import { DriveFileRenameOutlineOutlined } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Chip,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';

import axios from 'axios';
import * as React from 'react';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
	API_ROOT_URL,
	API_URL,
	LOCAL_STORAGE_USER_EMAIL_KEY,
} from '../../shared/constants';
import { UserFullInterface } from '../../shared/user.interface';
import { a11yProps, TabPanel } from './common-config';
import './Style.css';

const MyProfile = () => {
	const [value, setValue] = useState(0);
	const [profileData, setProfileData] = useState({} as UserFullInterface);

	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const response = await axios.post(`${API_URL}/users/getByEmail`, {
					email: localStorage.getItem(LOCAL_STORAGE_USER_EMAIL_KEY),
				});
				setProfileData(response.data);
			} catch (error: any) {
				console.error('An error occurred retrieving the user data:', error);
			}
		};

		fetchUserDetails().then();
	}, []);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box
			flexDirection={isSmallScreen ? 'column' : 'row'}
			sx={{
				flexGrow: 1,
				display: 'flex',
				width: '100%',
				height: 500,
			}}
		>
			<Tabs
				orientation={isSmallScreen ? 'horizontal' : 'vertical'}
				variant="scrollable"
				value={value}
				onChange={handleChange}
				sx={{
					borderRight: 1,
					borderColor: 'divider',
					marginTop: isSmallScreen ? 2 : 15,
					marginLeft: 2,
					width: isSmallScreen ? '100%' : 250,
					minWidth: isSmallScreen ? '100%' : 250,
					'&& .MuiTab-root': {
						fontSize: '1em',
						fontWeight: 400,
						alignItems: 'baseline',
						borderTop: isSmallScreen ? 'none' : '1px solid #7b7b7b',
						borderBottom: '1px solid #7b7b7b',
						textTransform: 'capitalize',
					},
					'&& .Mui-selected': {
						color: 'black',
						fontWeight: 'bolder',
						borderBottom: '5px solid black',
					},
				}}
				TabIndicatorProps={{
					style: {
						background: 'none',
					},
				}}
			>
				<Tab label="Basic Details" {...a11yProps(0)} />
				<Tab label="Additional Details" {...a11yProps(1)} />
				{profileData.maritalStatus === 'Married' && (
					<Tab label="Spouse Details" {...a11yProps(2)} />
				)}
				<Tab label="Personal Preferences" {...a11yProps(3)} />
			</Tabs>

			<div style={{ margin: '10px 20px' }}>
				<h1 className="header-text">
					My <span>Profile</span>
				</h1>
			</div>

			<Link className="link" to={'/edit-profile'}>
				Edit Profile
				<DriveFileRenameOutlineOutlined />
			</Link>

			<TabPanel value={value} index={0}>
				<Box sx={{ display: 'flex', marginBottom: 2 }}>
					<Box sx={{ marginRight: 4 }}>
						<Avatar
							sx={{ width: 120, height: 120 }}
							variant="square"
							src={API_ROOT_URL + profileData.profileImage}
						/>
					</Box>
					<Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Salutation
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.salutation ?? 'N/A'}
							</Typography>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								First Name
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.firstName ?? 'N/A'}
							</Typography>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Last Name
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.lastName ?? 'N/A'}
							</Typography>
						</Box>
						<Box>
							<Typography variant="h6" fontWeight="900">
								Email Address
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.email ?? 'N/A'}
							</Typography>
						</Box>
					</Box>
				</Box>
			</TabPanel>

			<TabPanel value={value} index={1}>
				<Box sx={{ display: 'flex', marginBottom: 2 }}>
					<Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Mobile Number
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.mobileNumber ?? 'N/A'}
							</Typography>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Home Address
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.homeAddress ?? 'N/A'}
							</Typography>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Country
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.country ?? 'N/A'}
							</Typography>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Postal Code
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.postalCode ?? 'N/A'}
							</Typography>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Nationality
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.nationality ?? 'N/A'}
							</Typography>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Date of Birth
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.dateOfBirth ?? 'N/A'}
							</Typography>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Gender
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.gender ?? 'N/A'}
							</Typography>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Martial Status
							</Typography>
							<Typography variant="body2" fontWeight="300">
								{profileData.maritalStatus ?? 'N/A'}
							</Typography>
						</Box>
					</Box>
				</Box>
			</TabPanel>

			{profileData.maritalStatus === 'Married' && (
				<TabPanel value={value} index={2}>
					<Box sx={{ display: 'flex', marginBottom: 2 }}>
						<Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Salutation
								</Typography>
								<Typography variant="body2" fontWeight="300">
									{profileData.spouseSalutation ?? 'N/A'}
								</Typography>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									First Name
								</Typography>
								<Typography variant="body2" fontWeight="300">
									{profileData.spouseFirstName ?? 'N/A'}
								</Typography>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Last Name
								</Typography>
								<Typography variant="body2" fontWeight="300">
									{profileData.spouseLastName ?? 'N/A'}
								</Typography>
							</Box>
						</Box>
					</Box>
				</TabPanel>
			)}

			<TabPanel
				value={value}
				index={profileData.maritalStatus === 'Married' ? 3 : 2}
			>
				<Box sx={{ display: 'flex', marginBottom: 2 }}>
					<Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Hobbies and interests
							</Typography>
							{profileData.hobbiesAndInterests?.length
								? profileData.hobbiesAndInterests.map((item, index) => (
									<Chip
										key={index}
										variant="outlined"
										color="default"
										label={item}
										avatar={<Avatar>{item.charAt(0)}</Avatar>}
									/>
								  ))
								: 'N/A'}
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Favorite Sports
							</Typography>
							{profileData.favoriteSports?.length
								? profileData.favoriteSports.map((item, index) => (
									<Chip
										key={index}
										variant="outlined"
										color="default"
										label={item}
										avatar={<Avatar>{item.charAt(0)}</Avatar>}
									/>
								  ))
								: 'N/A'}
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Preferred Music Genre
							</Typography>
							{profileData.preferredMusicGenres?.length
								? profileData.preferredMusicGenres.map((item, index) => (
									<Chip
										key={index}
										variant="outlined"
										color="default"
										label={item}
										avatar={<Avatar>{item.charAt(0)}</Avatar>}
									/>
								  ))
								: 'N/A'}
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="h6" fontWeight="900">
								Preferred Movies / TV Shows
							</Typography>
							{profileData.preferredMoviesAndTVShows?.length
								? profileData.preferredMoviesAndTVShows.map((item, index) => (
									<Chip
										key={index}
										variant="outlined"
										color="default"
										label={item}
										avatar={<Avatar>{item.charAt(0)}</Avatar>}
									/>
								  ))
								: 'N/A'}
						</Box>
					</Box>
				</Box>
			</TabPanel>
		</Box>
	);
};

export default MyProfile;
