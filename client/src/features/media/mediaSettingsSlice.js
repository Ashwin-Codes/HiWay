import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeMedia: {
		audio: true,
		video: true,
	},
};

const mediaSettingsSlice = createSlice({
	name: "mediaSettings",
	initialState,
	reducers: {
		setActiveMedia(state, action) {
			state.activeMedia = action.payload;
		},
	},
});

export function getActiveMedia(state) {
	return state.mediaSettings.activeMedia;
}

export const { setActiveMedia } = mediaSettingsSlice.actions;
export default mediaSettingsSlice.reducer;
