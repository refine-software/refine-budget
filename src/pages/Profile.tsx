import { useState, useContext } from "react";
import { updateUsername, updateProfileImage, logoutUser } from "../api";
import { AuthContext } from "../store/auth-context";

const Profile = () => {
	const auth = useContext(AuthContext);
	const { user, setUserCtx } = auth;
	const [newUsername, setNewUsername] = useState("");

	const handleLogout = () => {
		logoutUser();
		auth.logout();
	};

	const handleChangePicture = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			try {
				const res = await updateProfileImage(file);
				const updatedUser = { ...user, image: res.image };
				setUserCtx(updatedUser); // Update context with the new user object
			} catch (err) {
				console.error("Error updating profile image:", err);
			}
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
			<div className="flex justify-center items-center flex-col gap-4">
				<div className="w-30 h-30 border-primary border-2 rounded-full flex items-center justify-center overflow-hidden relative">
					<label
						htmlFor="profileImageInput"
						className="absolute bottom-0 w-full text-center font-medium"
					>
						<div className="bg-primary opacity-60 w-full h-full absolute"></div>
						<span className="relative text-white opacity-100">
							edit
						</span>
					</label>
					<img className="object-cover w-full h-full" loading="lazy" src={user.image} alt="profile picture" />
				</div>

				<input
					id="profileImageInput"
					type="file"
					accept="image/*"
					onChange={handleChangePicture}
					className="hidden"
				/>
			</div>

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
