import React from 'react';
import { useDispatch } from 'react-redux';
import authServices from '../../appwrite_backend/authService.js';
import { logOut } from '../../store/authSlice.js';

function LogoutBtn() {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		authServices()
			.logOut()
			.then(() => {
				dispatch(logOut());
			});
	};
	return (
		<button
			onClick={logoutHandler}
			className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
			Logout
		</button>
	);
}

export default LogoutBtn;
