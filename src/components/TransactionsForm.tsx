import React from "react";
import { DepositTypes, TransactionTypes } from "../types";

type OptionType = {
    value: DepositTypes | TransactionTypes | number;
    label: string;
}

type InputProps = {
    label: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    required: boolean;
}

type TextAreaProps = {
    label: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required: boolean;
}

type SelectProps = {
    label: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: OptionType[];
    required: boolean;
}

export const Input = ({ label, value, onChange, type = "text", required = false }: InputProps) => (
    <div className="flex flex-col gap-2">
        <label className="block">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full text-primary border border-primary rounded-xl p-2"
            placeholder={`Enter ${label.toLowerCase()}`}
        />
    </div>
);

export const TextArea = ({ label, value, onChange, required = false }: TextAreaProps) => (
    <div className="flex flex-col gap-2">
        <label className="block">{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            required={required}
            className="w-full !h-32 text-primary border border-primary rounded-xl p-2"
            placeholder={`Enter ${label.toLowerCase()}`}
        />
    </div>
);

export const SelectField = ({ label, value, onChange, options = [], required = false }: SelectProps) => (
    <div className="flex flex-col gap-2">
        <label className="block">{label}</label>
        <div className="relative w-full border border-primary rounded-xl">
            <select
                value={value}
                onChange={onChange}
                className="w-full h-full p-2 text-primary px-3 appearance-none"
                required={required}
            >
                {options.map((opt: OptionType) => (
                    <option key={opt.value.toString()} value={opt.value.toString()}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    </div>
);

