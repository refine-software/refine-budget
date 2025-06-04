import { useEffect, useState, useContext } from "react";
import {
	getUser,
	updateUsername,
	updateProfileImage,
	logoutUser,
} from "../api";
import { User } from "../types";
import { useNavigate } from "react-router";
import profileImage from "../../public/profile.svg";
import { AuthContext } from "../store/auth-context";
// import axios from "axios";

const Profile = () => {
	const auth = useContext(AuthContext);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const [newUsername, setNewUsername] = useState("");

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await getUser();
				if (result instanceof Error) {
					setError(result.message);
				} else {
					setUser(result);
					setNewUsername(result.name);
				}
			} catch (err) {
				setError(
					"An unexpected error occurred while fetching user data."
				);
			}
			setLoading(false);
		};

		fetchUser();
	}, []);

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
				const result = await updateProfileImage(file);
				if (result instanceof Error) {
					alert(`Error: ${result.message}`);
				} else {
					setUser(result);
				}
			} catch (err) {
				alert(
					"An unexpected error occurred while updating the profile image."
				);
			}
		}
	};

	const handleChangeUsername = async () => {
		const result = await updateUsername(newUsername);
		if (result instanceof Error) {
		} else {
			setUser(result);
			alert("Username updated successfully.");
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="flex flex-col items-center justify-center gap-10">
			<div className="flex justify-center items-center flex-col gap-4">
				<img
					className="rounded-full w-30 h-30 border-amber-600 border-2"
					src={user?.image || profileImage}
					alt="Profile"
					width={100}
				/>
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
					style={{ display: "none" }}
				/>
			</div>

			<div className="flex justify-center items-center flex-col gap-4 mt-4">
				<input
					style={{ textAlign: "center" }}
					className="border-1 border-primary py-3 px-6 rounded-xl text-center"
					type="text"
					value={newUsername}
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
