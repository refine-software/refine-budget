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
	const { isPending, data } = useQuery({
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
		<div className="flex flex-col items-center gap-14 mt-4">
			<div className="border-1 border-primary rounded-2xl flex justify-between items-center font-bold text-neutral-400 px-4 py-2">
				<input
					className="w-full focus:border-none focus:outline-none active:border-none active:outline-none"
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
					className="cursor-pointer p-2"
				>
					{
						addMutation.isPending ?
							<LoadingSpinner customSize="h-6 border-2" /> :
							<img src={addUserIcon} alt="adding user button" />
					}

				</button>
			</div>
			<div className="w-full flex flex-col justify-center items-center gap-8">
				<h2 className="font-bold text-2xl">Allowed Emails</h2>
				{isPending ? (
					<LoadingSpinner size="big" />
				) : (
					<ul className="w-full flex flex-col gap-4 text-neutral-200">
						{data?.length === 0 && (
							<p>No allowed emails yet.</p>
						)}
						{data?.map(({ id, email }) => (
							<li
								key={id}
								className="w-full flex justify-between items-center border-1 border-primary rounded-2xl font-semibold px-4 py-2"
							>
								<span className="text-sm">{email}</span>
								<button
									onClick={() => deleteMutation.mutate(id)}
									disabled={deletingId === id}
									className="cursor-pointer p-2 w-9 aspect-square"
								>
									{deletingId === id ? (
										<LoadingSpinner size="mid" />
									) : (
										<img
											className="w-full h-full"
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
		</div>
	);
};

export default ManageEmails;
