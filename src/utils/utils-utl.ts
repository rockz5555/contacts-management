import Cookies from 'js-cookie';

export const hasValidCookie = (): boolean => {
	const loginSession: string = Cookies.get('login_session') as string;

	return loginSession === 'OK';
};

export const isMobileBrowser = () => {
	return !!(
		RegExp(/Android/i).exec(navigator.userAgent) ??
		RegExp(/webOS/i).exec(navigator.userAgent) ??
		RegExp(/iPhone/i).exec(navigator.userAgent) ??
		RegExp(/iPad/i).exec(navigator.userAgent) ??
		RegExp(/iPod/i).exec(navigator.userAgent) ??
		RegExp(/BlackBerry/i).exec(navigator.userAgent) ??
		RegExp(/Windows Phone/i).exec(navigator.userAgent)
	);
};
