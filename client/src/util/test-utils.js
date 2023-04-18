import { render } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { store as reduxStore } from "../store/store";
import authSlice from "../features/auth/authSlice";

const customRender = (ui, { preloadedState = {}, ...options } = {}) => {
	let store = reduxStore;
	if (preloadedState) {
		store = configureStore({
			reducer: {
				auth: authSlice,
			},
			preloadedState,
		});
	}

	const Providers = ({ children }) => {
		return (
			<Provider store={store}>
				<Router>
					<Routes>
						<Route path="/*" element={children} />
					</Routes>
				</Router>
			</Provider>
		);
	};

	return render(ui, { wrapper: Providers, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
