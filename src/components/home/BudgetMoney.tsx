import { useQuery } from "@tanstack/react-query";
import { Budget } from "../../types";
import LoadingSpinner from "../ui/LoadingSpinner";
import { readableNumber } from "../../utils";

type Props = {
    func: () => Promise<Budget> | null;
};

const BudgetMoney = ({ func }: Props) => {
    const { isPending, isError, data, error } = useQuery({ queryKey: ["budget"], queryFn: func });

    if (isPending) {
        return <LoadingSpinner customSize="h-9 border-4" />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <p className="text-primary text-3xl font-bold">{readableNumber(data?.amount as number)} IQD</p>
    )
}

export default BudgetMoney;
