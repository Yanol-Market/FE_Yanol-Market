import axios from 'axios';
import { getCookie, refreshCookie } from './cookie';

/**
 * @param instance 실제 api 연결 시 사용되는 instance입니다.
 */

export const instanceTest = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

export const instanceNoToken = axios.create({
	baseURL: 'https://golden-ticket.site',
	headers: {
		'Content-Type': 'application/json',
	},
});
const instance = axios.create({
	baseURL: 'https://golden-ticket.site',
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use((config) => {
	const accessToken = getCookie('accessToken');
	if (accessToken) {
		config.headers['Authorization'] = `Bearer ${accessToken}`;
	}

	return config;
});

instance.interceptors.response.use(
	(response) => {
		response.headers['Cache-Control'] = 'no-cache';
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		const refreshToken = getCookie('refreshToken');
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const newAccessToken = await refreshCookie(refreshToken);
			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
			console.log('토큰 재발급 완료');
			return instance(originalRequest);
		}

		return Promise.reject(error);
	},
);

export default instance;
