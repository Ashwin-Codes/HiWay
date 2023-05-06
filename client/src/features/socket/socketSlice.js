import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	connected: false,
	connectionId: null,
};

const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		connect(state, action) {
			state.connected = true;
			state.connectionId = action.payload.id;
		},
	},
});

export const { connect } = socketSlice.actions;
export default socketSlice.reducer;
