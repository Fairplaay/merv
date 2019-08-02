import axios from 'axios';
import decode from 'jwt-decode';

/**
 * Singn user
 * @param {string} email
 * @param {string} password
 * @return {object} response data
 */
const login = async (email, password) => {
	const url = 'http://localhost:3001/api/auth/signin';
	const response = await fetch(url, {
		method: 'POST',
		data: {
			email,
			password
		}
	});

	await setToken(response.token);
	return response;
};

/**
 * Signup user
 * @param {string} email
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} password
 * @return {Object} response data
 */
const register = async (email, firstName, lastName, password) => {
	const url = 'http://localhost:3001/api/auth/signup';
	const response = await fetch(url, {
		method: 'POST',
		data: {
			email,
			firstName,
			lastName,
			password
		}
	});
	await setToken(response.token);
	return response;
};

/**
 * Save token user at localStorage
 * @param {string} idToken
 */
const setToken = idToken => {
	localStorage.setItem('id_token', idToken);
};

/**
 * Retrieves the user token from localStorage
 * @return {object} all data of the token
 */
const getToken = () => {
	return localStorage.getItem('id_token');
};

/**
 * Checks if there is a saved token and it's still valid
 * @return {boolean} loggedIn
 */
const loggedIn = () => {
	const token = getToken(); // Getting token from localstorage
	return !!token && !_isTokenExpired(token); // handwaiving here
};

/**
 * Clear user token and profile data from localStorage
 */
const logout = () => {
	localStorage.removeItem('id_token');
};

/**
 * Using jwt-decode npm package to decode the token
 * @return {object} getProfile()
 */
const getProfile = () => {
	if (loggedIn()) return decode(getToken());
};

/**
 * Checking if token is expired. 1 hour
 * @param {object} token
 * @return {boolean}
 * @private
 */
const _isTokenExpired = token => {
	try {
		const decoded = decode(token);
		if (decoded.exp < Date.now() / 1000) {
			return true;
		} else return false;
	} catch (err) {
		return false;
	}
};

/**
 * Performs api calls sending the required authentication headers
 * @param {string} url
 * @param {object} options
 * @returns {object} res.data
 */
const fetch = async (url, options) => {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	};

	// Setting Authorization header
	// auth-token: xxxxxxx.xxxxxxxx.xxxxxx
	if (loggedIn()) {
		headers['auth-token'] = getToken();
	}

	const response = await axios(url, {
		headers,
		...options
	});
	const res = await _checkStatus(response);
	return res.data;
};

/**
 * checkstatus of the api response
 * @param {object} response
 * @return {object} response || error
 * @private
 */
const _checkStatus = response => {
	// raises an error in case response status is not a success
	if (response.status >= 200 && response.status < 300) {
		// Success status lies between 200 to 300
		return response;
	} else {
		var error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
};

export { login, register, setToken, getToken, loggedIn, logout, getProfile, fetch };
