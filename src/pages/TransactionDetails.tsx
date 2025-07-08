import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Location, useLocation, useNavigate, useParams } from "react-router";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { strftimeWithText } from "@sharon-xa/strftime";
import { getTransactionById } from "../api/transactions";
import { readableNumber } from "../utils";
import { deleteLastTransaction } from "../api/admin/transactions";
import { AuthContext } from "../store/auth-context";
import { Role } from "../types";

const TransactionDetails = () => {
    const auth = useContext(AuthContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation() as Location & {
        state: { lastTransactionId: number };
    };
    const { lastTransactionId } = location.state as { lastTransactionId: number };

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["transaction", id],
        queryFn: () => getTransactionById(Number(id)),
        enabled: !!id,
    });

    const deleteLastTransMutation = useMutation({
        mutationFn: deleteLastTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["transactions"],
                exact: false,
                refetchType: "all",
            });
            queryClient.invalidateQueries({
                queryKey: ["budget"],
                exact: false,
                refetchType: "all",
            });
            navigate("/history");
        },
    });

    if (isPending) return <LoadingSpinner size="big" />;
    if (isError)
        return (
            <p className="text-red-500">Failed to load: {(error as Error).message}</p>
        );
    if (!data) return <p>No transaction found.</p>;

    const isDeposit = data.transaction_type === "deposit";
    const [formattedDate, err] = strftimeWithText(
        new Date(data.transaction_date),
        "%b %d, %Y — %I:%i %p",
    );

    return (
        <div className="relative flex flex-col justify-center gap-8 p-2">
            <h2 className="text-2xl font-bold text-white text-center">Transaction</h2>

            <div className="flex flex-col gap-6 text-white text-xl leading-relaxed">
                <div>
                    <p className="text-sm uppercase text-gray-400 mb-1">
                        Transaction Type
                    </p>
                    <p
                        className={`${isDeposit ? "text-green" : "text-red"} font-semibold capitalize`}
                    >
                        {data.transaction_type}
                    </p>
                </div>

                <div>
                    <p className="text-sm uppercase text-gray-400 mb-1">Amount</p>
                    <p className="font-semibold">{readableNumber(data.amount)} IQD</p>
                </div>

                {data.deposit_type?.deposit_type && (
                    <div>
                        <p className="text-sm uppercase text-gray-400 mb-1">Deposit Type</p>
                        <p className="font-semibold capitalize">
                            {data.deposit_type.deposit_type}
                        </p>
                    </div>
                )}

                {data.subscriber && (
                    <div>
                        <p className="text-sm uppercase text-gray-400 mb-1">Subscriber</p>
                        <p className="font-semibold">{data.subscriber}</p>
                    </div>
                )}

                <div>
                    <p className="text-sm uppercase text-gray-400 mb-1">Date</p>
                    <p className="font-semibold">
                        {err ? data.transaction_date : formattedDate}
                    </p>
                </div>

                <div>
                    <p className="text-sm uppercase text-gray-400 mb-1">Description</p>
                    <p className="font-medium whitespace-pre-line">{data.details}</p>
                </div>
            </div>

            {data.id === lastTransactionId && auth.role === Role.ADMIN && (
                <button
                    className="bg-primary text-white text-lg font-medium px-4 py-2 rounded-lg disabled:bg-primary-dim"
                    onClick={() => deleteLastTransMutation.mutate()}
                    disabled={deleteLastTransMutation.isPending}
                >
                    {deleteLastTransMutation.isPending ? (
                        <LoadingSpinner customSize="h-7 border-4" />
                    ) : (
                        "Delete"
                    )}
                </button>
            )}
        </div>
    );
};

export default TransactionDetails;
