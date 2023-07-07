import Cookies from 'js-cookie';

export const hasAValidCookie = (): boolean => {
	const loginSession: string = Cookies.get('login_session') as string;

	return loginSession === 'OK';
};
