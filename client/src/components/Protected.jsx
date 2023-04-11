import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth } from "../features/auth/authSlice";

export default function Protected({ children }) {
	const auth = useSelector(getAuth);
	if (auth.username && auth.accessToken) {
		return <div>{children}</div>;
	}
	return <Navigate to={"/login"} />;
}
