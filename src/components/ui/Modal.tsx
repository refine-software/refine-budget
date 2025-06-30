import React from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onApply: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
};

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onApply,
    title,
    children,
    className = "",
}) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-xs"
                onClick={onClose}
            />

            {/* Modal container */}
            <div
                className={`flex flex-col gap-12 bg-card-bg rounded-lg shadow-lg z-10 w-[90%] p-6 ${className}`}
            >
                {/* Header */}
                {title && (
                    <div className="text-2xl font-bold">
                        {title}
                    </div>
                )}

                {/* Body */}
                {children}

                {/* Close button (optional) */}
                <div className="flex justify-center gap-5">
                    <button
                        onClick={onClose}
                        className="py-2 px-6 bg-grey text-xl border rounded-xl w-[50%] capitalize"
                    >
                        cancel
                    </button>
                    <button
                        onClick={onApply}
                        className="py-2 px-6 bg-primary text-xl rounded-xl w-[50%] capitalize"
                    >
                        apply
                    </button>
                </div>
            </div>
        </div>,
        document.body // renders outside React root for full-screen overlay
    );
};

export default Modal;