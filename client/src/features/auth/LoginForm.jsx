import { NavLink } from "react-router-dom";

export default function LoginForm({ className }) {
	return (
		<div className={`w-full ${className}`}>
			<div className="mx-8">
				<h1 className="text-3xl font-semibold">Sign In</h1>
				<h2 className="mt-2 text-gray-500 font-normal">Login to use peer to peer video chat</h2>
			</div>
			<div>
				<form className="my-8">
					<div className="px-8 py-2">
						<label htmlFor="email" className="flex flex-col">
							<span className="text-lg">Email</span>
							<input
								type="text"
								id="email"
								className="border-2 rounded-lg h-10 outline-none px-4 tracking-wider"
							/>
						</label>
					</div>
					<div className="px-8 py-2">
						<label htmlFor="password" className="flex flex-col">
							<span className="text-lg">Password</span>
							<input
								type="password"
								id="password"
								className="border-2 rounded-lg h-10 outline-none px-4 tracking-wider"
							/>
						</label>
					</div>
					<div className="px-8 mt-4 h-10">
						<button type="submit" className="w-full h-full bg-slate-blue-500 rounded-lg text-white">
							Sign in
						</button>
					</div>
				</form>
				<span className="mt-4 mx-8 text-gray-500 font-normal">
					Don't have an account ?{" "}
					<NavLink to={"/signup"} className="text-slate-blue-500">
						Sign up
					</NavLink>
				</span>
			</div>
		</div>
	);
}
