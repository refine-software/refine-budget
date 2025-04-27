import { getBudget } from "../api";
import BudgetMoney from "../components/home/BudgetMoney";
import DebtMoney from "../components/home/DebtMoney";

const Home = () => {

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
    )
}

export default Home;