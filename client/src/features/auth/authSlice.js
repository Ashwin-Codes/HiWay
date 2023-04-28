import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import routes from "../../configs/routes";
import axios from "axios";

const initialState = {
	username: null,
	accessToken: null,
};

export const signIn = createAsyncThunk("auth/signIn", async (credentials, { rejectWithValue }) => {
	try {
		const response = await axios.post(routes.signin, credentials, {
			headers: {
				"Content-Type": "application/json",
			},

			withCredentials: true,
		});
		return { username: credentials.username, accessToken: response.data.accessToken };
	} catch (err) {
		const errObj = {
			code: err?.code,
			...(err?.response?.status && { status: err?.response?.status }),
			...(err?.response?.data.message && { message: err?.response?.data.message }),
		};
		return rejectWithValue(errObj);
	}
});

export const signUp = createAsyncThunk("auth/signUp", async (credentials, { rejectWithValue }) => {
	try {
		const response = await axios.post(routes.signup, credentials, {
			headers: {
				"Content-Type": "application/json",
			},

			withCredentials: true,
		});
		return { message: response?.data?.message, username: credentials.username };
	} catch (err) {
		const errObj = {
			code: err?.code,
			...(err?.response?.status && { status: err?.response?.status }),
			...(err?.response?.data.message && { message: err?.response?.data.message }),
		};
		return rejectWithValue(errObj);
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(signIn.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.username = action.payload.username;
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.username = action.payload.username;
			});
	},
});

export function getAuth(state, action) {
	return state.auth;
}

export default authSlice.reducer;
