// hooks/useTransactions.ts
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transactions";
import { TransactionsReqQueries } from "../types";

export const getTransactionsQueryKey = (params: TransactionsReqQueries) => [
    "transactions",
    params.page ?? 1,
    params.limit ?? 10,
    params.sort ?? "default",
    params.transactionType ?? "all",
    params.depositTypes?.length ? params.depositTypes.sort().join(",") : "none",
];

export function useTransactions(params: TransactionsReqQueries) {
    return useQuery({
        queryKey: getTransactionsQueryKey(params),
        queryFn: () => getTransactions.call(params),
    });
}
