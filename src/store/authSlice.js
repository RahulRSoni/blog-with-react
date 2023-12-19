import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: false,
	userData: null,
};

const authSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		logIn: (state, action) => {
			state.status = true;
			state.userData = action.payload.userData;
		},
		logOut: (state) => {
			state.status = true;
			state.userData = null;
		},
	},
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
