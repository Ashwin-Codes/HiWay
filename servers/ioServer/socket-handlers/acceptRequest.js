export default async function acceptRequest({ io, client, payload }) {
	io.to(payload.to).emit("request-accepted", { signalData: payload.signalData, acceptedBy: client.id });
}
