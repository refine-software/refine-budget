import React, { useState } from "react";
import {
	editUserDebt,
	editUserRole,
	deleteUser,
	relieveUserDebt,
} from "../../api/admin/users";
import { User, Role } from "../../types";
import profile from "../../../public/profile.svg";

interface UserCardProps {
	user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
	const [showEditDebtBox, setShowEditDebtBox] = useState(false);
	const [newDebt, setNewDebt] = useState<number>(user.debt);

	const handleEditDebt = async () => {
		const success = await editUserDebt(newDebt, user.id);
		if (success) {
			alert("Debt updated successfully!");
			setShowEditDebtBox(false);
		} else {
			alert("Failed to update debt.");
		}
	};

	const handleDebtRelief = async () => {
		try {
			await relieveUserDebt(user.id);
		} catch (err) {
			console.error("Error relieving debt:", err);
			alert("An error occurred while relieving debt.");
		}
	};

	const handleDeleteUser = async () => {
		const success = await deleteUser(user.id);
		if (success) {
			alert("User deleted successfully!");
		} else {
			alert("Failed to delete user.");
		}
	};

	const handleEditRole = async () => {
		const success = await editUserRole("admin", user.id);
		if (success) {
			alert("User role updated to admin!");
		} else {
			alert("Failed to update user role.");
		}
	};

	return (
		<div className="flex flex-col gap-2 border border-primary rounded-3xl p-2">
			<div className="relative h-12">
				{user.role === Role.ADMIN && (
					<div className="border border-primary text-primary rounded-2xl absolute left-2 top-2 py-0.5 px-1">
						Admin
					</div>
				)}
				{user.role === Role.USER && (
					<div className="border border-white text-primary rounded-2xl absolute left-2 top-2 py-0.5 px-1">
						User
					</div>
				)}

				<div className="absolute right-1 top-1 w-9 text-white border-1 border-primary rounded shadow-2xl p-2">
					<select
						className="block w-full text-left "
						onChange={(e) => {
							const selectedAction = e.target.value;
							if (selectedAction === "editDebt")
								setShowEditDebtBox(true);
							if (selectedAction === "debtRelief")
								handleDebtRelief();
							if (selectedAction === "deleteUser")
								handleDeleteUser();
							if (
								selectedAction === "setAdmin" &&
								user.role === Role.USER
							)
								handleEditRole();
							if (
								selectedAction === "setUser" &&
								user.role === Role.ADMIN
							)
								handleEditRole();
						}}
					>
						<option value="" selected disabled>
							{/* <img src={threeDots} alt="three dots" /> */}
							{/* <p className="text-primary">select an action</p> */}
							Select Action
						</option>
						<option value="editDebt">Edit Debt</option>
						<option value="debtRelief">Debt Relief</option>
						<option value="deleteUser">Delete User</option>
						{user.role === Role.USER && (
							<option value="setAdmin">Set as Admin</option>
						)}
						{user.role === Role.ADMIN && (
							<option value="setUser">Set as User</option>
						)}
					</select>
				</div>
			</div>
			<div className="flex items-center justify-center gap-4">
				<div className="rounded-full w-32 h-32 outline-1 outline-gray-300 overflow-hidden">
					<img
						src={user.image || profile}
						alt={`${user.name}'s profile`}
						className=" object-cover w-full h-full"
					/>
				</div>
				<div>
					<p className="font-bold text-xl">{user.name}</p>
					<p>{user.email}</p>
					<p>
						Debt Amount: IQD <span>{user.debt}</span>
					</p>
				</div>
			</div>
			{showEditDebtBox && (
				<div className="flex border-primary w-full mt-4">
					<input
						type="number"
						placeholder={newDebt.toString()}
						onChange={(e) => setNewDebt(Number(e.target.value))}
						className="outline-none border border-primary rounded-lg p-1"
					/>
					<div className="flex gap-2 ml-2">
						<button onClick={handleEditDebt}>Submit</button>
						<button onClick={() => setShowEditDebtBox(false)}>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserCard;
