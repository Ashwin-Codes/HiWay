import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeMedia: {
		audio: true,
		video: true,
	},
	pickedMediaPreference: false,
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
		setPickedMediaPreference(state, action) {
			state.pickedMediaPreference = action.payload;
		},
	},
});

export function getActiveMedia(state) {
	return state.mediaSettings.activeMedia;
}

export function getPermissionError(state) {
	return state.mediaSettings.permissionError;
}

export function getPickedMediaPreference(state) {
	return state.mediaSettings.pickedMediaPreference;
}

export const { setActiveMedia, setPermissionError, setPickedMediaPreference } = mediaSettingsSlice.actions;
export default mediaSettingsSlice.reducer;
