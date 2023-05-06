import { io } from "socket.io-client";
import routes from "../../configs/routes";

const socket = io(routes.socket);

export default socket;
