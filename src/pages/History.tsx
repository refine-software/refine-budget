import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transactions";
import { SortTypes, TransactionsReqQueries } from "../types";
import Cards from "../components/history/Cards";

const History = () => {
	const [transReqQuery, setTransReqQuery] = useState<TransactionsReqQueries>({
		page: 1,
		limit: 10,
		sort: SortTypes.dateDesc,
	});

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["transactions", transReqQuery],
		queryFn: () => getTransactions.call(transReqQuery),
	});
	let body;

	console.log("History page transactions", data);
	if (isPending) {
		body = <span>Loading...</span>;
	} else if (isError) {
		body = <span>Error: {(error as Error).message}</span>;
	} else if (data) {
		body = <Cards transactions={data.transactions} />;
	} else {
		body = <p className="text-center text-2xl">No transactions found.</p>;
	}
	return <div className="mb-20">{body}</div>;
};

export default History;
