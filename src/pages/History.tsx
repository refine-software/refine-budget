import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transactions";
import {
	DepositTypes,
	SortTypes,
	TransactionsReqQueries,
	TransactionTypes,
} from "../types";
import Cards from "../components/history/Cards";
import Pagination from "../components/history/Pagination";
import SortAndFilter from "../components/history/SortAndFilter";

const History = () => {
	const [transReqQuery, setTransReqQuery] = useState<TransactionsReqQueries>({
		page: 1,
		limit: 4,
		sort: SortTypes.dateDesc,
	});

	const setPage = (page: number) => {
		setTransReqQuery((prev) => {
			return {
				...prev,
				page: page,
			};
		});
	};

	const setSort = (sortType: SortTypes) => {
		setTransReqQuery((prev) => {
			return {
				...prev,
				sort: sortType,
			};
		});
	};

	const setTransactionType = (transType: TransactionTypes) => {
		setTransReqQuery((prev) => {
			return {
				...prev,
				transactionType: transType,
			};
		});
	};

	const setDepositTypes = (depositTypes: DepositTypes[]) => {
		setTransReqQuery((prev) => {
			return {
				...prev,
				depositTypes: depositTypes,
			};
		});
	};

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
		body = (
			<>
				<SortAndFilter
					setDepositTypes={setDepositTypes}
					setSort={setSort}
					setTransactionType={setTransactionType}
				/>
				<Cards transactions={data.transactions} />
				<Pagination
					currentPage={transReqQuery.page}
					pages={data.num_of_pages}
					setPage={setPage}
				/>
			</>
		);
	} else {
		body = <p className="text-center text-2xl">No transactions found.</p>;
	}
	return <div className="mb-20">{body}</div>;
};

export default History;
