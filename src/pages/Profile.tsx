import { useState, useContext } from "react";
import { updateUsername, updateProfileImage, logoutUser } from "../api";
import { useNavigate } from "react-router";
// import profileImage from "../../public/profile.svg";
import { AuthContext } from "../store/auth-context";
// import axios from "axios";

const Profile = () => {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const { user, setUserCtx } = auth;
	const [newUsername, setNewUsername] = useState("");

	const handleLogout = () => {
		auth.logout();
		logoutUser();
		navigate("/login");
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
				<div className="w-30 h-30 border-primary border-2 rounded-full flex items-center justify-center overflow-hidden">
					<img
						className="object-cover w-full h-full"
						src={user.image}
						alt="Profile"
						width={100}
					/>
				</div>

				<label
					htmlFor="profileImageInput"
					className="text-primary font-medium"
				>
					Change Profile Image
				</label>
				<input
					id="profileImageInput"
					type="file"
					accept="image/*"
					onChange={handleChangePicture}
					className="hidden"
				/>
			</div>

			<div className="flex justify-center items-center flex-col gap-4 mt-4">
				<input
					style={{ textAlign: "center" }}
					className="border-1 border-primary py-3 px-6 rounded-xl text-center"
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
