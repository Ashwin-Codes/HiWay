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

export const refreshToken = createAsyncThunk("auth/refreshToken", async (signal = null, { rejectWithValue }) => {
	try {
		const response = await axios.get(routes.refresh, { withCredentials: true, signal });
		return { username: response.data.username, accessToken: response.data.accessToken };
	} catch (err) {
		const errObj = {
			code: err?.code,
			...(err?.response?.status && { status: err?.response?.status }),
			...(err?.response?.data.message && { message: err?.response?.data.message }),
		};
		return rejectWithValue(errObj);
	}
});

export const logout = createAsyncThunk("auth/logout", async (signal = null, { rejectWithValue }) => {
	try {
		const response = await axios.get(routes.logout, { withCredentials: true });
		if (!(response?.data?.message === "logout successful")) {
			throw new Error("logout failed");
		}
		return { message: "logout successful" };
	} catch (err) {
		return rejectWithValue({ message: err?.message });
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			state.accessToken = null;
			state.username = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(signIn.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.username = action.payload.username;
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.username = action.payload.username;
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.username = action.payload.username;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.accessToken = null;
				state.username = null;
			});
	},
});

export function getAuth(state, action) {
	return state.auth;
}

export default authSlice.reducer;
