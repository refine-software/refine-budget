import { JSX, useState } from "react";
import { getTransactions } from "../api/transactions";
import { useQuery } from "@tanstack/react-query";
import { SortTypes, TransactionsReqQueries } from "../types";
import Cards from "../components/history/Cards";

const History = () => {
    const [transReqQuery, setTransReqQuery] = useState<TransactionsReqQueries>({
        page: 1,
        limit: 10,
        sort: SortTypes.dateDesc,
    });
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["transactions"],
        queryFn: getTransactions.bind(transReqQuery),
    });

    let body: string | JSX.Element = "";

    if (isPending) {
        body = `<span>Loading...</span>`
    }

    if (isError) {
        body = `<span>Error: ${error.message}</span>`
    }

    if (!isError && !isPending && data) {
        body = <Cards transactions={data.transactions} />
    }

    return (
        <div className="mb-20">
            {body}
        </div>
    )
}

export default History;
