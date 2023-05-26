import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	connected: false,
	connectionId: null,
	roomId: null,
	roomUsers: [],
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
		setUsers(state, action) {
			state.roomUsers = action.payload;
		},
	},
});

export function getSocketState(state) {
	return state.socket;
}

export function getAllUsersInRoom(state) {
	return state.socket.roomUsers;
}

export const { connect, newRoom, setUsers } = socketSlice.actions;
export default socketSlice.reducer;
