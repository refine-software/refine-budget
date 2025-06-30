import { memo } from "react";
import { DepositTypes } from "../../types";

type Props = {
    selected: DepositTypes[];
    setSelected: (types: DepositTypes[]) => void;
};

const depositTypeOptions: DepositTypes[] = Object.values(DepositTypes);

const DepositMultiSelect = memo(({ selected, setSelected }: Props) => {
    const toggleSelection = (type: DepositTypes) => {
        const updated =
            selected.includes(type)
                ? selected.filter((t) => t !== type)
                : [...selected, type];

        setSelected(updated);
    };

    return (
        <div>
            <label className="block mb-2 text-sm text-primary">Deposit Types</label>
            <div className="grid grid-cols-2 gap-3">
                {depositTypeOptions.map((type) => {
                    const isSelected = selected.includes(type);
                    return (
                        <button
                            key={type}
                            onClick={() => toggleSelection(type)}
                            className={`rounded-full border-2 px-4 py-2 text-md font-semibold transition-colors duration-150 
                                ${isSelected
                                    ? "bg-primary text-white border-primary"
                                    : "bg-transparent text-white border-white/30 hover:border-white/60"}`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

export default DepositMultiSelect;
