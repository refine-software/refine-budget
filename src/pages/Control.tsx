import { useNavigate } from "react-router";

const Control = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center space-y-5 gap-y-3 pt-10">
			<button
				className="bg-primary text-white py-2 px-6 rounded-xl border-1 w-80 h-15 font-semibold text-lg hover:drop-shadow-md hover:drop-shadow-amber-700"
				onClick={() => navigate("/manage-emails")}
			>
				Manage allowed Emails
			</button>
			<div className="w-80 h-0.5 bg-amber-50 rounded-full"></div>
			<button
				className="bg-primary text-white py-2 px-6 rounded-xl border-1 w-80 h-15 font-semibold text-lg hover:drop-shadow-md hover:drop-shadow-amber-700"
				onClick={() => navigate("/transactions")}
			>
				Transactions
			</button>
			<div className="w-80 h-0.5 bg-amber-50 rounded-full"></div>
			<button
				className="bg-primary text-white py-2 px-6 rounded-xl border-1 w-80 h-15 font-semibold text-lg hover:drop-shadow-md hover:drop-shadow-amber-700"
				onClick={() => navigate("/users")}
			>
				Users
			</button>
		</div>
	);
};

export default Control;
