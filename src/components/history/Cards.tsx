import { useState, useRef, useEffect, memo } from "react";
import { Transaction, TransactionTypes } from "../../types";
import { strftime } from "@sharon-xa/strftime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLastTransaction } from "../../api/admin/transactions";
import LoadingSpinner from "../ui/LoadingSpinner";
import { readableNumber } from "../../utils";

const Card = memo(({ transaction, lastTransactionId }: { transaction: Transaction, lastTransactionId: number }) => {
    const queryClient = useQueryClient();
    const [expanded, setExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const [shortText, setShortText] = useState("");
    const descriptionRef = useRef<HTMLDivElement>(null);

    const isDeposit = transaction.transaction_type === TransactionTypes.deposit;
    const [formattedDate, err] = strftime(new Date(transaction.transaction_date), "b d, Y");

    const maxChars = 80;
    useEffect(() => {
        if (transaction.description.length > maxChars) {
            setShowReadMore(true);
            setShortText(transaction.description.slice(0, maxChars));
        } else {
            setShortText(transaction.description);
            setShowReadMore(false);
        }
    }, [transaction.description]);

    const deleteLastTransMutation = useMutation({
        mutationFn: deleteLastTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"], exact: false, refetchType: "all" });
            queryClient.invalidateQueries({ queryKey: ["budget"], exact: false, refetchType: "all" });
        },
    });

    return (
        <div className="relative">
            {/* Overlay shown while deleting */}
            {deleteLastTransMutation.isPending && (
                <div className="absolute inset-0 bg-black/50 z-50 rounded-3xl pointer-events-none">
                    <LoadingSpinner size="mid" />
                </div>
            )}

            <div
                className={`min-h-56 bg-card-bg rounded-3xl p-5 flex flex-col gap-5 shadow-xl transition-all duration-300`}
                key={transaction.id}
            >
                <div className="flex justify-between items-center">
                    <p className={`capitalize text-2xl font-bold ${isDeposit ? "text-green" : "text-red"}`}>
                        {transaction.transaction_type}
                    </p>
                    {transaction.id === lastTransactionId && (
                        <button
                            className="h-9 w-9 z-30"
                            onClick={() => deleteLastTransMutation.mutate()}
                            disabled={deleteLastTransMutation.isPending}
                        >
                            <img src="/delete-trans.svg" alt="delete transaction" className="w-full h-full" />
                        </button>
                    )}
                </div>

                <div ref={descriptionRef} className="font-medium text-white-50 overflow-hidden">
                    {!expanded ? (
                        <>
                            {shortText}
                            {showReadMore ? "..." : ""}
                            {showReadMore && (
                                <button
                                    className="text-primary font-semibold inline ml-2 underline"
                                    onClick={() => setExpanded(true)}
                                >
                                    More
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            {transaction.description}
                            <button
                                className="text-primary font-semibold inline ml-2 underline"
                                onClick={() => setExpanded(false)}
                            >
                                Less
                            </button>
                        </>
                    )}
                </div>

                <div className="flex justify-between mt-auto">
                    <div className='text-xl font-medium text-white-75'>
                        {err !== null ? "couldn't parse date" : formattedDate}
                    </div>
                    <div className={`text-xl font-medium ${isDeposit ? "text-green" : "text-red"}`}>
                        {isDeposit ? "+" : "-"}{readableNumber(transaction.amount)} IQD
                    </div>
                </div>
            </div>
        </div>
    );
});

const Cards = memo(({ transactions, lastTransactionId }: { transactions: Transaction[], lastTransactionId: number }) => {
    return (
        <div className="flex flex-col gap-6">
            {transactions.map(transaction => (
                <Card key={transaction.id} transaction={transaction} lastTransactionId={lastTransactionId} />
            ))}
        </div>
    );
});

export default Cards;