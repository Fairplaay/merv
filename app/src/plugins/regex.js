/**
 * condition for the validation email
 */
export const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; // eslint-disable-line

/**
 * condition for the validation password
 */
export const passwordRegex = /^(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
