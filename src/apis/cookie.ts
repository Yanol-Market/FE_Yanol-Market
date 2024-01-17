import { Cookies } from 'react-cookie';
import instance from './axios';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: object) => {
	return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
	return cookies.get(name);
};

export const deleteCookie = () => {
	const accessToken = getCookie('accessToken');
	const refreshToken = getCookie('refreshToken');

	setCookie('refreshToken', refreshToken, {
		path: '/',
		secure: '/',
		maxAge: 0,
	});

	setCookie('accessToken', accessToken, {
		path: '/',
		secure: '/',
		maxAge: 0,
	});
};

export const refreshCookie = async () => {
	try {
		const refreshTokenValue = getCookie('refreshToken');
		if (refreshTokenValue) {
			const res = await instance.post('/reissue', {
				refreshToken: refreshTokenValue,
			});
			if (res) {
				const { accessToken, refreshToken } = res.data.data;
				setCookie('accessToken', accessToken);
				setCookie('refreshToken', refreshToken);
				return accessToken;
			}
		}
	} catch (err) {
		console.error('토큰 재발급 실패', err);
	}
};
