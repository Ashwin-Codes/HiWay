import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	connected: false,
	connectionId: null,
	roomId: null,
};

const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		connect(state, action) {
			state.connected = true;
			state.connectionId = action.payload.id;
		},
		newRoom(state, action) {
			state.roomId = action.payload.roomId;
		},
	},
});

export function getSocketState(state) {
	return state.socket;
}

export const { connect, newRoom } = socketSlice.actions;
export default socketSlice.reducer;
