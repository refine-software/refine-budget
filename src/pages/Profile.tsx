import { useState, useContext } from "react";
import { updateUsername, updateProfileImage, logoutUser } from "../api";
import { AuthContext } from "../store/auth-context";
import LazyImage from "../components/ui/LazyImage";
import edit from "../assets/edit.png";
import { useMutation } from "@tanstack/react-query";

const Profile = () => {
	const { user, setUserCtx, logout } = useContext(AuthContext);
	const [newUsername, setNewUsername] = useState("");

	const handleLogout = () => {
		logoutUser();
		logout();
	};

	const mutation = useMutation({
		mutationFn: updateProfileImage,
		onSuccess: (data) => {
			const updatedUser = { ...user, image: data.image };
			setUserCtx(updatedUser);
		},
		onError: (err) => {
			console.error("Error updating profile image:", err);
		},
	});

	const handleChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			mutation.mutate(file);
		}
	};

	const handleChangeUsername = async () => {
		try {
			const res = await updateUsername(newUsername);
			user.name = res.name;
			setUserCtx(user);
		} catch (err) {
			console.error("Error updating username:", err);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center gap-10">
			<label
				htmlFor="profileImageInput"
				className="relative block w-40 h-40 rounded-full overflow-hidden cursor-pointer outline-2 outline-primary"
			>
				<LazyImage
					src={user.image}
					alt="profile picture"
					wrapperClassName="w-full h-full rounded-full overflow-clip"
					className="object-cover w-full h-full"
				/>

				<div className="absolute bottom-0 w-full h-8 p-1 bg-primary/80 flex justify-center items-center">
					<img className="w-auto h-full" src={edit} alt="edit profile picture" />
				</div>

				<input
					id="profileImageInput"
					type="file"
					accept="image/*"
					onChange={handleChangePicture}
					className="hidden"
				/>
			</label>



			<div className="w-full flex justify-center items-center flex-col gap-4 mt-4">
				<input
					className="w-[80%] border-1 border-primary py-3 px-6 rounded-xl text-center"
					type="text"
					placeholder={user.name}
					onChange={(e) => setNewUsername(e.target.value)}
				/>
				<button
					className="bg-primary text-white py-2 px-6 rounded-xl hover:bg-opacity-90"
					onClick={handleChangeUsername}
				>
					Update Username
				</button>
			</div>

			<div className="flex justify-center items-center flex-col gap-4 mt-4">
				<button
					className="bg-red-600 text-white py-2 px-6 rounded-xl hover:bg-opacity-90"
					onClick={handleLogout}
				>
					Log Out
				</button>
			</div>
		</div>
	);
};

export default Profile;
