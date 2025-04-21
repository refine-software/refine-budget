import { getBudget } from "../api";
import BudgetMoney from "../components/home/BudgetMoney";
import DebtMoney from "../components/home/DebtMoney";

const Home = () => {

    return (
        <div className="h-full mt-12 flex flex-col justify-center items-center gap-12 text-center">
            <div className="flex flex-col justify-center items-center gap-5">
                <p className="text-4xl font-bold">Our Budget</p>
                <BudgetMoney func={getBudget} />
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
                <p className="text-4xl font-bold">Your Debt</p>
                <DebtMoney />
            </div>
        </div>
    )
}

export default Home;