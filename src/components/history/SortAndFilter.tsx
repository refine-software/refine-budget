import { memo, useState } from "react";
import { DepositTypes, SortTypes, TransactionTypes } from "../../types";
import Modal from "../ui/Modal";
import DepositMultiSelect from "../ui/DepositMultiSelect";
import filter from "../../assets/filter.png";
import sort from "../../assets/sort.png";

type Props = {
	setSort: (sortType: SortTypes) => void;
	setTransactionType: (transType: TransactionTypes | "all") => void;
	setDepositTypes: (depositTypes: DepositTypes[]) => void;
};

const SortAndFilter = memo(({ setSort, setDepositTypes, setTransactionType }: Props) => {
	const [openFilter, setOpenFilter] = useState(false);
	const [openSort, setOpenSort] = useState(false);
	const [transactionTypeInput, setTransactionTypeInput] = useState<TransactionTypes | "all">("all");
	const [depositTypesInput, setDepositTypesInput] = useState<DepositTypes[]>([]);
	const [sortInput, setSortInput] = useState<SortTypes>(SortTypes.dateDesc);

	const handleApplyFilters = () => {
		setTransactionType(transactionTypeInput);
		setDepositTypes(depositTypesInput);
		setOpenFilter(false);
	};

	const handleApplySort = () => {
		setSort(sortInput);
		setOpenSort(false);
	};

	return (
		<div className="flex justify-between">
			<button className="w-10" onClick={() => setOpenFilter(true)}>
				<img src={filter} alt="Open filters" />
			</button>
			<button className="w-10" onClick={() => setOpenSort(true)}>
				<img src={sort} alt="Open sort options" />
			</button>

			{/* Filters Modal */}
			<Modal
				title="Filters"
				isOpen={openFilter}
				onClose={() => setOpenFilter(false)}
				onApply={handleApplyFilters}
			>
				<div className="flex flex-col justify-center items-center gap-3">
					<div className="relative w-[80%] mb-4">
						<select
							name="transaction-type"
							className="w-full border-2 border-primary rounded-xl py-3 px-4 bg-card-bg text-white appearance-none focus:outline-none"
							value={transactionTypeInput}
							onChange={(e) => setTransactionTypeInput(e.target.value as TransactionTypes | "all")}
						>
							<option value="all">All</option>
							<option value={TransactionTypes.deposit}>Deposit</option>
							<option value={TransactionTypes.withdrawal}>Withdrawal</option>
						</select>
						<label
							htmlFor="transaction-type"
							className="absolute -top-2 left-4 bg-card-bg px-1 text-sm text-primary"
						>
							Transaction Type
						</label>
					</div>

					<div className="w-[90%]">
						<DepositMultiSelect
							selected={depositTypesInput}
							setSelected={setDepositTypesInput}
						/>
					</div>
				</div>
			</Modal>

			{/* Sort Modal */}
			<Modal
				title="Sort"
				isOpen={openSort}
				onClose={() => setOpenSort(false)}
				onApply={handleApplySort}
			>
				<div className="flex flex-col justify-center items-center gap-3">
					<div className="relative w-[90%]">
						<select
							name="sort-type"
							className="w-full border-2 border-primary rounded-xl py-3 px-4 bg-card-bg text-white appearance-none focus:outline-none"
							value={sortInput}
							onChange={(e) => setSortInput(e.target.value as SortTypes)}
						>
							<option value={SortTypes.dateDesc}>Newest First</option>
							<option value={SortTypes.dateAsc}>Oldest First</option>
							<option value={SortTypes.amountDesc}>Amount High → Low</option>
							<option value={SortTypes.amountAsc}>Amount Low → High</option>
						</select>
						<label
							htmlFor="sort-type"
							className="absolute -top-2 left-4 bg-card-bg px-1 text-sm text-primary"
						>
							Sort By
						</label>
					</div>
				</div>
			</Modal>
		</div>
	);
});

export default SortAndFilter;
