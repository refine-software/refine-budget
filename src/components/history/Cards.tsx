import { useState, useRef, useEffect, memo } from "react";
import { Transaction, TransactionTypes } from "../../types";
import { strftime } from "@sharon-xa/strftime";
import { readableNumber } from "../../utils";
import { Link } from "react-router";

const Card = memo(({ transaction, lastTransactionId }: { transaction: Transaction, lastTransactionId: number }) => {
    const [expanded, setExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const [shortText, setShortText] = useState("");
    const descriptionRef = useRef<HTMLDivElement>(null);

    const isDeposit = transaction.transaction_type === TransactionTypes.deposit;
    const [formattedDate, err] = strftime(new Date(transaction.transaction_date), "b d, Y");

    const maxChars = 78;
    useEffect(() => {
        if (transaction.details.length > maxChars) {
            setShowReadMore(true);
            setShortText(transaction.details.slice(0, maxChars));
        } else {
            setShortText(transaction.details);
            setShowReadMore(false);
        }
    }, [transaction.details]);


    return (
        <Link
            to={`/history/${transaction.id}`}
            state={{ lastTransactionId }}
        >
            <div className="relative">
                <div
                    className={`min-h-56 bg-card-bg rounded-3xl p-5 flex flex-col gap-5 shadow-xl transition-all duration-300`}
                    key={transaction.id}
                >
                    <div className="flex justify-between items-center">
                        <p className={`capitalize text-2xl font-bold ${isDeposit ? "text-green" : "text-red"}`}>
                            {transaction.transaction_type}
                        </p>
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
                                {transaction.details}
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
        </Link>
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