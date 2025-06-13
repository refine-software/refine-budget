import { DepositTypes, SortTypes, TransactionTypes } from "../../types";

type Props = {
    setSort: (sortType: SortTypes) => void;
    setTransactionType: (transType: TransactionTypes) => void;
    setDepositTypes: (depositTypes: DepositTypes[]) => void;
}

const SortAndFilter = ({ setSort, setDepositTypes, setTransactionType }: Props) => {
    return (
        <div>

        </div>
    )
}

export default SortAndFilter;