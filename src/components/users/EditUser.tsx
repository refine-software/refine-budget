import { useContext, useState } from "react";
import threeDots from "/three-dots.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AuthContext } from "../../store/auth-context";
import {
    deleteUser,
    editUserDebt,
    editUserRole,
    relieveUserDebt,
} from "../../api/admin/users";
import { Role, User } from "../../types";
import axios from "axios";
import Modal from "../ui/Modal";

const EditUser = ({ user }: { user: User }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [openEditDebt, setOpenEditDebt] = useState(false);
    const [newDebt, setNewDebt] = useState<number>(0);
    const [error, setError] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleEditDebt = async () => {
        try {
            await editUserDebt(newDebt, user.id);
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
        } catch (err) {
            console.log(err);
            setError("Couldn't edit user debt");
        }
    };

    const handleDebtRelief = async () => {
        try {
            await relieveUserDebt(user.id);
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
        } catch (err) {
            console.log(err);
            if (axios.isAxiosError(err))
                setError("failed to relief debt: " + err.message);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(user.id);
            if (user.id === auth.user.id) {
                auth.logout();
                navigate("/login");
            }
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
        } catch (err) {
            console.log(err);
            setError("failed to delete user");
        }
    };

    const handleEditRole = async (role: Role) => {
        await editUserRole(role, user.id);
        queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    };
    console.log(error);

    return (
        <div className="relative">
            <img
                src={threeDots}
                alt="user settings"
                className="w-8 cursor-pointer py-2"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
            />
            {isDropdownOpen && (
                <div className="absolute right-0 top-8 bg-[#333] text-white rounded-md z-50 w-48 overflow-hidden border-2 border-[#515151] shadow-2xl">
                    <button
                        className="w-full px-4 py-2 text-left hover:bg-primary/25"
                        onClick={() => setOpenEditDebt(true)}
                    >
                        Edit Debt
                    </button>
                    <button
                        className="w-full px-4 py-2 text-left hover:bg-primary/25"
                        onClick={() => {
                            handleDebtRelief();
                            setIsDropdownOpen(false);
                        }}
                    >
                        Relieve Debt
                    </button>
                    <button
                        className="w-full px-4 py-2 text-left hover:bg-primary/25"
                        onClick={() => {
                            handleEditRole(user.role === Role.ADMIN ? Role.USER : Role.ADMIN);
                        }}
                    >
                        Set as {user.role === Role.ADMIN ? "User" : "Admin"}
                    </button>
                    <button
                        className="w-full px-4 py-2 text-left hover:bg-primary/25"
                        onClick={() => {
                            handleDeleteUser();
                            setIsDropdownOpen(false);
                        }}
                    >
                        Delete User
                    </button>
                </div>
            )}
            <Modal
                isOpen={openEditDebt}
                title="Edit Debt"
                onApply={() => {
                    handleEditDebt();
                    setOpenEditDebt(false);
                    setIsDropdownOpen(false);
                }}
                onClose={() => {
                    setOpenEditDebt(false);
                    setIsDropdownOpen(false);
                }}
            >
                <div className="flex flex-col gap-3">
                    <label>Debt Amount</label>
                    <input
                        type="number"
                        onChange={(e) => {
                            setNewDebt(parseInt(e.target.value));
                        }}
                        required
                        className="w-full text-primary placeholder:text-[#515151] focus:placeholder:text-primary/40 border-2 border-[#515151] focus:border-primary focus:bg-primary/10 rounded-xl p-2"
                        placeholder="25000"
                    />
                    <small className="text-sm/relaxed">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-primary inline"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                            />
                        </svg>
                        &nbsp; Enter a positive number to increase the user's debt, or a
                        negative number to decrease it.
                    </small>
                </div>
            </Modal>
        </div>
    );
};

export default EditUser;
