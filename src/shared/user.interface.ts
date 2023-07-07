export interface UserInterface {
	profileImageUrl: string;
	fullName: string;
	email: string;
	mobile: string;
	address: string;
	gender: string;
	country: string;
}

export interface UserFullInterface {
	_id: string;
	profileImage: string;
	email: string;
	country: string;
	firstName: string;
	gender: string;
	maritalStatus: string;
	spouseSalutation: string;
	spouseFirstName: string;
	spouseLastName: string;
	homeAddress: string;
	lastName: string;
	mobileNumber: string;
	nationality: string;
	dateOfBirth: string;
	postalCode: string;
	salutation: string;
	hobbiesAndInterests: string[];
	favoriteSports: string[];
	preferredMoviesAndTVShows: string[];
	preferredMusicGenres: string[];
}
