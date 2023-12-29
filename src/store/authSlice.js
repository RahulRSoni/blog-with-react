import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: false,
	userData: {},
};

const authSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		logIn: (state, action) => {
			state.status = true;
			state.userData = action.payload;
		},
		logOut: (state) => {
			state.status = false;
			state.userData = {};
		},
	},
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
