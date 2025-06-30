import axios from "axios";
import profile from "/default-profile.svg";
import threeDots from "/three-dots.svg";
import debt from "/debt.png";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import {
	editUserDebt,
	editUserRole,
	deleteUser,
	relieveUserDebt,
} from "../../api/admin/users";
import { User, Role } from "../../types";
import { AuthContext } from "../../store/auth-context";

interface UserCardProps {
	user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [newDebt, setNewDebt] = useState<number>(user.debt);
	const [error, setError] = useState("");

	const handleEditDebt = async () => {
		const success = await editUserDebt(newDebt, user.id);
		if (success) {
			alert("Debt updated successfully!");
		} else {
			alert("Failed to update debt.");
		}
	};

	const handleDebtRelief = async () => {
		try {
			await relieveUserDebt(user.id);
		} catch (err) {
			console.log(err);
			if (axios.isAxiosError(err))
				setError("failed to relief debt: " + err.message);
		}
	};

	const handleDeleteUser = async () => {
		try {
			await deleteUser(user.id);
			auth.logout();
			navigate("/login");
		} catch (err) {
			console.log(err);
			setError("failed to delete user");
		};
	}

	const handleEditRole = async (role: Role) => {
		const success = await editUserRole(role, user.id);
		if (success) {
			alert("User role updated to admin!");
		} else {
			alert("Failed to update user role.");
		}
	};

	return (
		<div className="flex flex-col gap-7 bg-[#2A2A2A] rounded-3xl p-4 shadow-2xl outline-2 outline-[#515151]">
			{error !== "" && error}
			<div className="h-10 flex justify-between items-center px-2.5">
				<div className="w-24 py-1 border border-primary text-center text-primary rounded-lg bg-primary/10 uppercase font-bold">
					{user.role}
				</div>

				<div className="relative">
					<img
						src={threeDots}
						alt="user settings"
						className="w-10 cursor-pointer py-2"
						onClick={() => setIsDropdownOpen(prev => !prev)}
					/>
					{isDropdownOpen && (
						<div className="absolute right-0 top-10 bg-[#333] text-white shadow-lg rounded-md z-50 w-48 overflow-hidden border border-[#555]">
							<button
								className="w-full px-4 py-2 text-left hover:bg-primary/20"
								onClick={() => {
									handleDebtRelief();
									setIsDropdownOpen(false);
								}}
							>
								Relieve Debt
							</button>
							<button
								className="w-full px-4 py-2 text-left hover:bg-primary/20"
								onClick={() => {
									handleDeleteUser();
									setIsDropdownOpen(false);
								}}
							>
								Delete User
							</button>
							<button
								className="w-full px-4 py-2 text-left"
								onClick={() => {
									handleEditRole(user.role === Role.ADMIN ? Role.USER : Role.ADMIN);
								}}
							>
								Set as {user.role === Role.ADMIN ? "User" : "Admin"}
							</button>
						</div>
					)}
				</div>
			</div>
			<div className="flex items-center justify-center gap-4 px-2.5">
				<div className="rounded-full w-24 aspect-square outline-2 outline-primary overflow-hidden">
					<img
						src={user.image || profile}
						alt={`${user.name}'s profile`}
						className=" object-cover w-full h-full"
					/>
				</div>
				<div className="flex flex-col gap-2.5">
					<p className="font-bold text-xl">{user.name}</p>
					<p>{user.email}</p>
				</div>
			</div>

			<div className="h-14 border-t-2 border-[#515151] flex justify-between items-center px-4 pt-4">
				<div className="flex justify-center items-center gap-3">
					<div className="w-7 aspect-square">
						<img src={debt} alt="debt" className="object-cover w-full h-full" />
					</div>
					<span>Debt</span>
				</div>
				<p className={`${user.debt > 0 && "text-red"}`}>
					{user.debt} IQD
				</p>
			</div>
		</div>
	);
};

export default UserCard;
