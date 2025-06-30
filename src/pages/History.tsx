import { useCallback, useState } from "react";
import { DepositTypes, SortTypes, TransactionTypes } from "../types";
import SortAndFilter from "../components/history/SortAndFilter";
import Cards from "../components/history/Cards";
import Pagination from "../components/history/Pagination";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useTransactions } from "../hooks/useTransactions";

const History = () => {
	const [query, setQuery] = useState({
		page: 1,
		limit: 5,
		sort: SortTypes.dateDesc,
		transactionType: undefined as TransactionTypes | undefined,
		depositTypes: [] as DepositTypes[],
	});

	const updateQuery = useCallback((updates: Partial<typeof query>) => {
		setQuery((prev) => ({ ...prev, ...updates }));
	}, []);

	const { isPending, isError, data, error } = useTransactions(query);

	return (
		<div className="flex flex-col gap-8">
			<SortAndFilter
				setSort={(s) => updateQuery({ sort: s })}
				setTransactionType={(t) =>
					updateQuery({ transactionType: t === "all" ? undefined : t })
				}
				setDepositTypes={(d) => updateQuery({ depositTypes: d })}
			/>

			{/* Only the Cards section reacts to loading */}
			{isPending && <LoadingSpinner size="big" />}
			{isError && <span className="text-red-500">Error: {(error as Error).message}</span>}
			{!isPending && data?.transactions === null && (
				<div className="flex justify-center items-center">
					<p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-300 uppercase">
						No transactions found
					</p>
				</div>
			)}
			{!isPending && data && data.transactions?.length > 0 && (
				<Cards transactions={data.transactions} />
			)}

			{/* Always show pagination if metadata exists */}
			{
				data && data.transactions && (
					<Pagination
						currentPage={data.metadata.current_page}
						pages={data.metadata.last_page}
						setPage={(p) => updateQuery({ page: p })}
					/>
				)
			}
		</div >
	);
};

export default History;
