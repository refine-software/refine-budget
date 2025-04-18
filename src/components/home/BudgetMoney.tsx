import { useQuery } from "@tanstack/react-query";
import { Budget } from "../../types";

type Props = {
    func: () => Promise<Budget> | null;
};

const BudgetMoney = ({ func }: Props) => {
    const { isPending, isError, data, error } = useQuery({ queryKey: ["budget"], queryFn: func });

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <p className="text-primary text-3xl font-bold">{data?.amount} IQD</p>
    )
}

export default BudgetMoney;
