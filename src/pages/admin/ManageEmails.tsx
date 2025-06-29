import { useState } from "react";
import deleteUserIcon from "/delete-user-icon.svg";
import addUserIcon from "/add-user-icon.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserEmail, deleteUserEmail, getUserEmails } from "../../api/admin/emails";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const ManageEmails = () => {
	const [newEmail, setNewEmail] = useState("");
	const [deletingId, setDeletingId] = useState<number | null>(null);
	const queryClient = useQueryClient();
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["emails"],
		queryFn: getUserEmails,
	});

	const addMutation = useMutation({
		mutationFn: addUserEmail,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["emails"] });
			setNewEmail("");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteUserEmail,
		onMutate: (id: number) => {
			setDeletingId(id);
		},
		onSettled: () => {
			setDeletingId(null);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["emails"] });
		},
	});

	return (
		<div className="flex flex-col items-center gap-8">
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
					onClick={() => {
						if (!newEmail.trim()) return;
						addMutation.mutate(newEmail.trim());
					}}
					disabled={addMutation.isPending}
					className="mr-4 cursor-pointer p-2"
				>
					{
						addMutation.isPending ?
							<LoadingSpinner size="mid" /> :
							<img src={addUserIcon} alt="adding user button" />
					}

				</button>
			</div>
			<h2 className="font-bold text-2xl">Allowed Emails</h2>
			{isPending ? (
				<LoadingSpinner size="big" />
			) : (
				<ul className="flex flex-col gap-4 text-neutral-200">
					{data?.length === 0 && (
						<p>No allowed emails yet.</p>
					)}
					{data?.map(({ id, email }) => (
						<li
							key={id}
							className="border-1 border-primary rounded-2xl w-85 h-15 flex justify-between items-center font-bold px-4"
						>
							<span>{email}</span>
							<button
								onClick={() => deleteMutation.mutate(id)}
								disabled={deletingId === id}
								className="cursor-pointer p-2"
							>
								{deletingId === id ? (
									<LoadingSpinner size="mid" />
								) : (
									<img
										className=""
										src={deleteUserIcon}
										alt="delete user button"
									/>
								)}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ManageEmails;
