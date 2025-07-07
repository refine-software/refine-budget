import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../ui/LoadingSpinner";
import { readableNumber } from "../../utils";
import { getBudget } from "../../api";

const BudgetMoney = () => {
    const { isPending, isError, data, error } = useQuery({ queryKey: ["budget"], queryFn: getBudget });

    if (isPending) {
        return <LoadingSpinner customSize="h-9 border-4" />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <p className="text-primary text-3xl font-bold">{readableNumber(data?.amount)} IQD</p>
    )
}

export default BudgetMoney;
