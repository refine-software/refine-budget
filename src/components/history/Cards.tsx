import { useState, useRef, useEffect } from "react";
import { Transaction, TransactionTypes } from "../../types";
import { strftime } from "@sharon-xa/strftime";

const Card = ({ transaction }: { transaction: Transaction }) => {
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


    return (
        <div className={`min-h-56 bg-card-bg rounded-3xl my-5 p-5 flex flex-col gap-5 shadow-xl transition-all duration-300`} key={transaction.id}>
            <div className={`capitalize text-2xl font-bold ${isDeposit ? "text-green" : "text-red"}`}>
                {transaction.transaction_type}
            </div>

            <div
                ref={descriptionRef}
                className="font-medium text-white-50 overflow-hidden"
            >
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
                    {isDeposit ? "+" : "-"}{transaction.amount} IQD
                </div>
            </div>
        </div>
    );
};

const Cards = ({ transactions }: { transactions: Transaction[] }) => {
    return (
        <>
            {transactions.map(transaction => (
                <Card key={transaction.id} transaction={transaction} />
            ))}
        </>
    );
};

export default Cards;