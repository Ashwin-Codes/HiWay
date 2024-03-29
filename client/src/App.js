import { Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/Protected";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { refreshToken } from "./features/auth/authSlice";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoadingPage from "./pages/LoadingPage";
import VideoChat from "./pages/VideoChat";
import ThankYou from "./pages/ThankYou";
import UnsupportedPlatformModal from "./components/UnsupportedPlatformModal";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const controller = new AbortController();
		async function request() {
			try {
				await dispatch(refreshToken(controller.signal)).unwrap();
				setLoading(false);
			} catch (err) {
				if (err.code === "ERR_CANCELED") return;
				setLoading(false);
			}
		}
		request();
		return () => {
			controller.abort();
		};
	}, [dispatch]);

	if (loading) return <LoadingPage />;

	return (
		<>
			<UnsupportedPlatformModal />
			<Routes>
				<Route path="/">
					<Route
						index
						element={
							<Protected>
								<Home />
							</Protected>
						}
					/>
					<Route path="/:roomId" element={<VideoChat />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Register />} />
					<Route path="thankyou" element={<ThankYou />} />
					<Route path="*" element={<Navigate to={"/"} />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
