import { useState } from "react";
import deleteUserIcon from "/delete-user-icon.svg";
import addUserIcon from "/add-user-icon.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserEmail, deleteUserEmail, getUserEmails } from "../../api/admin/emails";

const ManageEmails = () => {
	const queryClient = useQueryClient();
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["emails"],
		queryFn: getUserEmails,
	});
	const addMutation = useMutation({
		mutationFn: addUserEmail,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["emails"] });
		},
	});
	const deleteMutation = useMutation({
		mutationFn: deleteUserEmail,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["emails"] });
		},
	});
	const [newEmail, setNewEmail] = useState("");

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="border-1 border-primary rounded-2xl w-85 h-15 flex justify-between items-center mb-3 font-bold text-neutral-400">
				<input
					className="ml-4 focus:border-none focus:outline-none active:border-none active:outline-none"
					type="email"
					placeholder="Enter email"
					value={newEmail}
					onChange={(e) => setNewEmail(e.target.value)}
					required
				/>
				<button
					onClick={() => addMutation.mutate(newEmail)}
					className="mr-4 cursor-pointer p-2"
				>
					<img src={addUserIcon} alt="adding user button" />
				</button>
			</div>
			<h2 className="self-start ml-2 font-bold">Allowed Emails</h2>
			<ul>
				{data?.map(({ id, email }) => (
					<li
						key={id}
						className="border-1 border-primary rounded-2xl w-85 h-15 flex justify-between items-center mb-3 font-bold text-neutral-400"
					>
						<span className="flex ml-4">{email}</span>
						<button
							onClick={() => deleteMutation.mutate(id)}
							className="mr-4 cursor-pointer p-2"
						>
							<img
								className="mr-4"
								src={deleteUserIcon}
								alt="delete user button"
							/>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ManageEmails;
