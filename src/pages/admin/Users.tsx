import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { debtReliefAll, getAdminUsers } from "../../api/admin/users";
import UserCard from "../../components/users/UserCard";

const Users = () => {
	const queryClient = useQueryClient();
	const {
		data: users = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["adminUsers"],
		queryFn: getAdminUsers,
	});

	const debtReliefMutation = useMutation({
		mutationFn: debtReliefAll,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
			alert("Debt relief applied to all users successfully!");
		},
		onError: () => {
			alert("Failed to apply debt relief to all users.");
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading users: {error.message}</div>;
	return (
		<div className="flex flex-col items-center justify-center">
			<button
				onClick={() => debtReliefMutation.mutate()}
				className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded  mb-4"
			>
				Apply Debt Relief to All Users
			</button>

			<div className="flex flex-col gap-6 justify-items-start w-full">
				{users.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		</div>
	);
};

export default Users;
