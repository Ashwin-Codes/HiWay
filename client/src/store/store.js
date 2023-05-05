import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import mediaSettingsSlice from "../features/media/mediaSettingsSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		mediaSettings: mediaSettingsSlice,
	},
});

export default store;
