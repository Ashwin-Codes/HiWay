import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeMedia: {
		audio: true,
		video: true,
	},
	permissionError: false,
};

const mediaSettingsSlice = createSlice({
	name: "mediaSettings",
	initialState,
	reducers: {
		setActiveMedia(state, action) {
			state.activeMedia = action.payload;
		},
		setPermissionError(state, action) {
			state.permissionError = action.payload;
		},
	},
});

export function getActiveMedia(state) {
	return state.mediaSettings.activeMedia;
}

export function getPermissionError(state) {
	return state.mediaSettings.permissionError;
}

export const { setActiveMedia, setPermissionError } = mediaSettingsSlice.actions;
export default mediaSettingsSlice.reducer;
