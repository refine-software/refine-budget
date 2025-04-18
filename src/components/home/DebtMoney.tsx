import { useQuery } from "@tanstack/react-query";
import { Debt } from "../../types";

type Props = {
    func: () => Promise<Debt> | null;
};

const DebtMoney = ({ func }: Props) => {
    const { isPending, isError, data, error } = useQuery({ queryKey: ["debt"], queryFn: func });

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <p className="text-primary text-3xl font-bold">{data?.debt} IQD</p>
    )
}

export default DebtMoney;