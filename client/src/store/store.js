import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import mediaSettingsSlice from "../features/media/mediaSettingsSlice";
import socketSlice from "../features/socket/socketSlice";
import socketMiddleware from "../features/socket/socketMiddleware";

const store = configureStore({
	reducer: {
		auth: authSlice,
		mediaSettings: mediaSettingsSlice,
		socket: socketSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
