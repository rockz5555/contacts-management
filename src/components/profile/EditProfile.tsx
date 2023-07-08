import { ChevronLeftOutlined } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Chip,
	FormControl,
	Input,
	LinearProgress,
	Link as MatLink,
	MenuItem,
	Select,
	Tab,
	Tabs,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import axios, { AxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import * as React from 'react';
import {
	BaseSyntheticEvent,
	Fragment,
	SyntheticEvent,
	useEffect,
	useState,
} from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
	API_ROOT_URL,
	API_URL,
	LOCAL_STORAGE_USER_EMAIL_KEY,
} from '../../shared/constants';
import { UserFullInterface } from '../../shared/user.interface';
import ActionButtons from './ActionButtons';
import { a11yProps, TabPanel } from './common-config';
import './Style.css';

const EditProfile = () => {
	const [loading, setLoading] = useState(true);
	const [value, setValue] = useState(0);
	const [profileData, setProfileData] = useState<UserFullInterface>(
		null as any
	);
	const [profileImage, setProfileImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);

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
			} finally {
				setLoading(false);
			}
		};

		fetchUserDetails().then();
	}, []);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleImageUpload = (event: BaseSyntheticEvent) => {
		const file = event.target.files[0];
		setProfileImage(file);
		setPreviewImage(URL.createObjectURL(file) as any);
	};

	const isItemNotExist = (arr: string[], value: string): boolean => {
		return !arr.find((f) => f.toLowerCase() === value.toLowerCase());
	};

	const handleAddItemKeyPress = (
		event: any,
		changeType: 'hobbies' | 'sports' | 'music' | 'movies'
	) => {
		const key = event.key;

		if (key === 'Enter' || key === 'Tab' || key === ';') {
			event.preventDefault();

			const value: string = event.target.value;
			let itemExist = true;

			switch (changeType) {
			case 'hobbies': {
				if (isItemNotExist(profileData.hobbiesAndInterests, value)) {
					itemExist = false;
					profileData.hobbiesAndInterests.push(value);
					setProfileData((prevState) => {
						return {
							...prevState,
							hobbiesAndInterests: profileData.hobbiesAndInterests,
						};
					});
				}
				break;
			}
			case 'sports': {
				if (isItemNotExist(profileData.favoriteSports, value)) {
					itemExist = false;
					profileData.favoriteSports.push(value);
					setProfileData((prevState) => {
						return {
							...prevState,
							favoriteSports: profileData.favoriteSports,
						};
					});
				}
				break;
			}
			case 'music': {
				if (isItemNotExist(profileData.preferredMusicGenres, value)) {
					itemExist = false;
					profileData.preferredMusicGenres.push(value);
					setProfileData((prevState) => {
						return {
							...prevState,
							preferredMusicGenres: profileData.preferredMusicGenres,
						};
					});
				}
				break;
			}
			default:
				if (isItemNotExist(profileData.preferredMoviesAndTVShows, value)) {
					itemExist = false;
					profileData.preferredMoviesAndTVShows.push(value);
					setProfileData((prevState) => {
						return {
							...prevState,
							preferredMoviesAndTVShows:
									profileData.preferredMoviesAndTVShows,
						};
					});
				}
			}
			if (itemExist) {
				toast.info('This item already added', {
					theme: 'dark',
					autoClose: 500,
					hideProgressBar: true,
				});
			}
			event.target.value = null;
		}
	};

	const handleSubmit = async (event: BaseSyntheticEvent) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('profileImage', profileImage ?? '');
		formData.append('user', JSON.stringify(profileData));

		const requestConfig: AxiosRequestConfig = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		setLoading(true);

		try {
			const response = await axios.put(
				`${API_URL}/users`,
				formData,
				requestConfig
			);

			if (response.data) {
				toast.success('Profile updated successfully!', { theme: 'dark' });
			}
		} catch (error: any) {
			toast.error(error?.response.data.message, { theme: 'dark' });
			console.error('An error occurred while updating the profile:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Fragment>
			{loading && (
				<LinearProgress
					sx={{
						height: 10,
						bottom: 10,
					}}
				/>
			)}

			<ToastContainer />

			<Box
				component="form"
				onSubmit={handleSubmit}
				flexDirection={isSmallScreen ? 'column' : 'row'}
				autoComplete="off"
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
					{profileData?.maritalStatus === 'Married' && (
						<Tab label="Spouse Details" {...a11yProps(2)} />
					)}
					<Tab label="Personal Preferences" {...a11yProps(3)} />
				</Tabs>

				<div style={{ margin: '10px 20px' }}>
					<h1 className="header-text">
						Edit <span>Profile</span>
					</h1>
				</div>

				<Link className="link" to={'/my-profile'}>
					<ChevronLeftOutlined />
					Go back to My Profile
				</Link>

				<TabPanel value={value} index={0}>
					<Box sx={{ display: 'flex', marginBottom: 2 }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'column',
								marginRight: 4,
							}}
						>
							<Avatar
								sx={{ width: 120, height: 120 }}
								variant="square"
								src={
									profileData?.profileImage && !previewImage
										? API_ROOT_URL + profileData.profileImage
										: (previewImage as any)
								}
							/>
							<Typography
								component="span"
								variant="body1"
								sx={{ marginTop: 2 }}
							>
								<MatLink
									component="label"
									htmlFor="image-upload"
									underline="hover"
									style={{
										width: '115px',
										textAlign: 'center',
										fontSize: '11px',
										marginTop: '-11px',
										marginRight: '6px',
										color: 'black',
									}}
									sx={{ cursor: 'pointer' }}
								>
									<span style={{ textDecoration: 'underline' }}>
										Upload image
									</span>
									<br />
									<span style={{ textDecoration: 'none', fontStyle: 'italic' }}>
										(JPG or PNG format with a maximum size of 1 MB)
									</span>
								</MatLink>
							</Typography>
						</Box>
						<input
							id="image-upload"
							type="file"
							accept=".jpg, .png"
							style={{ display: 'none' }}
							onChange={handleImageUpload}
						/>

						<Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Salutation
								</Typography>
								<FormControl variant="outlined" fullWidth>
									<Select
										required
										value={profileData?.salutation || ''}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												salutation: e.target.value,
											}))
										}
										label="Salutation"
										variant="standard"
										MenuProps={{ style: { maxHeight: '300px' } }}
									>
										<MenuItem value="Mr.">Mr.</MenuItem>
										<MenuItem value="Ms.">Ms.</MenuItem>
										<MenuItem value="Mrs.">Mrs.</MenuItem>
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									First Name
								</Typography>
								<FormControl variant="outlined" fullWidth>
									<Input
										required
										value={profileData?.firstName}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												firstName: e.target.value,
											}))
										}
									></Input>
								</FormControl>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Last Name
								</Typography>
								<FormControl variant="outlined" fullWidth>
									<Input
										required
										value={profileData?.lastName}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												lastName: e.target.value,
											}))
										}
									></Input>
								</FormControl>
							</Box>
							<Box>
								<Typography variant="h6" fontWeight="900">
									Email Address
								</Typography>
								<Typography variant="body2" fontWeight="300">
									{profileData?.email ?? 'N/A'}
								</Typography>
							</Box>
							<ActionButtons />
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
								<FormControl variant="outlined" fullWidth>
									<Input
										required
										value={profileData?.mobileNumber}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												mobileNumber: e.target.value,
											}))
										}
									></Input>
								</FormControl>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Home Address
								</Typography>
								<FormControl variant="outlined" fullWidth>
									<Input
										required
										value={profileData?.homeAddress}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												homeAddress: e.target.value,
											}))
										}
									></Input>
								</FormControl>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Country
								</Typography>
								<FormControl variant="outlined" fullWidth>
									<Input
										required
										value={profileData?.country}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												country: e.target.value,
											}))
										}
									></Input>
								</FormControl>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Postal Code
								</Typography>
								<FormControl variant="outlined" fullWidth>
									<Input
										required
										value={profileData?.postalCode}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												postalCode: e.target.value,
											}))
										}
									></Input>
								</FormControl>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Nationality
								</Typography>
								<FormControl variant="outlined" fullWidth>
									<Input
										required
										value={profileData?.nationality}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												nationality: e.target.value,
											}))
										}
									></Input>
								</FormControl>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Date of Birth
								</Typography>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['DatePicker']}>
										<DatePicker
											value={
												dayjs(profileData?.dateOfBirth) || dayjs(Date.now())
											}
											onChange={(date: any) =>
												setProfileData((prevData) => ({
													...prevData,
													dateOfBirth: date,
												}))
											}
										/>
									</DemoContainer>
								</LocalizationProvider>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Gender
								</Typography>
								<FormControl variant="outlined" fullWidth>
									<Select
										value={profileData?.gender || ''}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												gender: e.target.value,
											}))
										}
										label="Martial Status"
										variant="standard"
										MenuProps={{ style: { maxHeight: '300px' } }}
									>
										<MenuItem value="Male">Male</MenuItem>
										<MenuItem value="Female">Female</MenuItem>
										<MenuItem value="Transgender">Transgender</MenuItem>
										<MenuItem value="Neutral">Neutral</MenuItem>
										<MenuItem value="Non-Binary">Non-Binary</MenuItem>
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Martial Status
								</Typography>
								<FormControl variant="outlined" fullWidth>
									<Select
										value={profileData?.maritalStatus || ''}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												maritalStatus: e.target.value,
											}))
										}
										label="Martial Status"
										variant="standard"
										MenuProps={{ style: { maxHeight: '300px' } }}
									>
										<MenuItem value="Single">Single</MenuItem>
										<MenuItem value="Married">Married</MenuItem>
										<MenuItem value="Divorced">Divorced</MenuItem>
										<MenuItem value="Seperated">Seperated</MenuItem>
										<MenuItem value="Widowed">Widowed</MenuItem>
									</Select>
								</FormControl>
							</Box>
							<ActionButtons />
						</Box>
					</Box>
				</TabPanel>

				{profileData?.maritalStatus === 'Married' && (
					<TabPanel value={value} index={2}>
						<Box sx={{ display: 'flex', marginBottom: 2 }}>
							<Box>
								<Box sx={{ marginBottom: 2 }}>
									<Typography variant="h6" fontWeight="900">
										Salutation
									</Typography>
									<Select
										value={profileData.spouseSalutation || ''}
										onChange={(e) =>
											setProfileData((prevData) => ({
												...prevData,
												spouseSalutation: e.target.value,
											}))
										}
										label="Salutation"
										variant="standard"
										MenuProps={{ style: { maxHeight: '300px' } }}
									>
										<MenuItem value="Mr.">Mr.</MenuItem>
										<MenuItem value="Ms.">Ms.</MenuItem>
										<MenuItem value="Mrs.">Mrs.</MenuItem>
									</Select>
								</Box>
								<Box sx={{ marginBottom: 2 }}>
									<Typography variant="h6" fontWeight="900">
										First Name
									</Typography>
									<FormControl variant="outlined" fullWidth>
										<Input
											value={profileData?.spouseFirstName}
											onChange={(e) =>
												setProfileData((prevData) => ({
													...prevData,
													spouseFirstName: e.target.value,
												}))
											}
										></Input>
									</FormControl>
								</Box>
								<Box sx={{ marginBottom: 2 }}>
									<Typography variant="h6" fontWeight="900">
										Last Name
									</Typography>
									<FormControl variant="outlined" fullWidth>
										<Input
											value={profileData?.spouseLastName}
											onChange={(e) =>
												setProfileData((prevData) => ({
													...prevData,
													spouseLastName: e.target.value,
												}))
											}
										></Input>
									</FormControl>
								</Box>
								<ActionButtons />
							</Box>
						</Box>
					</TabPanel>
				)}

				<TabPanel
					value={value}
					index={profileData?.maritalStatus === 'Married' ? 3 : 2}
				>
					<Box sx={{ display: 'flex', marginBottom: 2 }}>
						<Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Hobbies and interests
								</Typography>
								<div>
									<TextField
										label="Type and enter/tab key to add"
										variant="standard"
										placeholder="Type and enter/tab key to add"
										onKeyDown={(e) => handleAddItemKeyPress(e, 'hobbies')}
										sx={{
											width: 300,
											marginBottom: 2,
										}}
									/>
								</div>
								{profileData?.hobbiesAndInterests?.length
									? profileData.hobbiesAndInterests.map((item, index) => (
										<Chip
											key={index}
											variant="outlined"
											color="default"
											label={item}
											onDelete={() =>
												setProfileData((prevData) => {
													prevData.hobbiesAndInterests.splice(index, 1);
													return {
														...prevData,
													};
												})
											}
											avatar={<Avatar>{item.charAt(0)}</Avatar>}
										/>
									  ))
									: 'N/A'}
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Favorite Sports
								</Typography>
								<div>
									<TextField
										label="Type and enter/tab key to add"
										variant="standard"
										placeholder="Type and enter/tab key to add"
										onKeyDown={(e) => handleAddItemKeyPress(e, 'sports')}
										sx={{
											width: 300,
											marginBottom: 2,
										}}
									/>
								</div>
								{profileData?.favoriteSports?.length
									? profileData.favoriteSports.map((item, index) => (
										<Chip
											key={index}
											variant="outlined"
											color="default"
											label={item}
											onDelete={() =>
												setProfileData((prevData) => {
													prevData.favoriteSports.splice(index, 1);
													return {
														...prevData,
													};
												})
											}
											avatar={<Avatar>{item.charAt(0)}</Avatar>}
										/>
									  ))
									: 'N/A'}
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Preferred Music Genre
								</Typography>
								<div>
									<TextField
										label="Type and enter/tab key to add"
										variant="standard"
										placeholder="Type and enter/tab key to add"
										onKeyDown={(e) => handleAddItemKeyPress(e, 'music')}
										sx={{
											width: 300,
											marginBottom: 2,
										}}
									/>
								</div>
								{profileData?.preferredMusicGenres?.length
									? profileData.preferredMusicGenres.map((item, index) => (
										<Chip
											key={index}
											variant="outlined"
											color="default"
											label={item}
											onDelete={() =>
												setProfileData((prevData) => {
													prevData.preferredMusicGenres.splice(index, 1);
													return {
														...prevData,
													};
												})
											}
											avatar={<Avatar>{item.charAt(0)}</Avatar>}
										/>
									  ))
									: 'N/A'}
							</Box>
							<Box sx={{ marginBottom: 2 }}>
								<Typography variant="h6" fontWeight="900">
									Preferred Movies / TV Shows
								</Typography>
								<div>
									<TextField
										label="Type and enter/tab key to add"
										variant="standard"
										placeholder="Type and enter/tab key to add"
										onKeyDown={(e) => handleAddItemKeyPress(e, 'movies')}
										sx={{
											width: 300,
											marginBottom: 2,
										}}
									/>
								</div>
								{profileData?.preferredMoviesAndTVShows?.length
									? profileData.preferredMoviesAndTVShows.map((item, index) => (
										<Chip
											key={index}
											variant="outlined"
											color="default"
											label={item}
											onDelete={() =>
												setProfileData((prevData) => {
													prevData.preferredMoviesAndTVShows.splice(index, 1);
													return {
														...prevData,
													};
												})
											}
											avatar={<Avatar>{item.charAt(0)}</Avatar>}
										/>
									  ))
									: 'N/A'}
							</Box>
							<ActionButtons />
						</Box>
					</Box>
				</TabPanel>
			</Box>
		</Fragment>
	);
};

export default EditProfile;
