export default async function sendConnectionRequest({ io, client, payload }) {
	io.to(payload.to).emit("incoming-connection-request", { signalData: payload.signalData, requestFrom: client.id });
}
