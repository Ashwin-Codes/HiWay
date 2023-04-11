import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: null,
	accessToken: null,
};

const authSlice = createSlice({ name: "auth", initialState, reducers: {} });

export function getAuth(state, action) {
	return state.auth;
}

export default authSlice.reducer;
