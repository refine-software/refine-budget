import { getBudget } from "../api";
import BudgetMoney from "../components/home/BudgetMoney";
import DebtMoney from "../components/home/DebtMoney";

const Home = () => {
	return (
		<div className="h-full mt-4 flex flex-col justify-center items-center gap-12 text-center">
			<p className="text-primary text-4xl font-bold">Team Budget</p>
			<div className="w-full flex flex-col justify-center items-center gap-6">
				<div className="py-10 rounded-2xl w-full flex flex-col justify-center items-center gap-6 bg-grey shadow-2xl">
					<p className="text-3xl font-bold">Our Budget</p>
					<BudgetMoney func={getBudget} />
				</div>
				<div className="py-10 rounded-2xl w-full flex flex-col justify-center items-center gap-6 bg-grey shadow-2xl">
					<p className="text-3xl font-bold">Your Debt</p>
					<DebtMoney />
				</div>
			</div>
		</div>
	);
};

export default Home;
