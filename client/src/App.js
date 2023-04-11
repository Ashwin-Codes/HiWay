import { Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/Protected";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
	return (
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
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Register />} />
				<Route path="*" element={<Navigate to={"/"} />} />
			</Route>
		</Routes>
	);
}

export default App;
