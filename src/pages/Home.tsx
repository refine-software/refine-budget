import { useState, useEffect } from "react";
import { getBudget } from "../api";
import BudgetMoney from "../components/home/BudgetMoney";
import DebtMoney from "../components/home/DebtMoney";

const Home = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				await getBudget();
			} catch (err) {
				console.error("Error fetching budget:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="h-full flex justify-center items-center">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
			</div>
		);
	}

	return (
		<div className="h-full mt-12 flex flex-col justify-center items-center gap-12 text-center">
			<p className="text-primary text-4xl font-bold">Team Budget</p>
			<div className="py-4 rounded-2xl w-full flex flex-col justify-center items-center gap-5 bg-[#373737] shadow-2xl">
				<p className="text-3xl font-bold">Our Budget</p>
				<BudgetMoney func={getBudget} />
			</div>
			<div className="py-4 rounded-2xl w-full flex flex-col justify-center items-center gap-5 bg-[#373737] shadow-2xl">
				<p className="text-3xl font-bold">Your Debt</p>
				<DebtMoney />
			</div>
		</div>
	);
};

export default Home;
