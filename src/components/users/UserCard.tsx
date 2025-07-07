import profile from "/default-profile.svg";
import debt from "/debt.png";
import verified from "/verified.png"
import unverified from "/unverified.png"
import { User } from "../../types";
import EditUser from "./EditUser";
import { readableNumber } from "../../utils";

interface UserCardProps {
	user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {

	return (
		<div className="flex flex-col gap-7 bg-[#2A2A2A] rounded-3xl p-4 shadow-2xl outline-2 outline-[#515151]">
			<div className="h-10 flex justify-between items-center px-2.5">
				<div className="w-24 py-1 border border-primary text-center text-primary rounded-lg bg-primary/10 uppercase font-medium">
					{user.role}
				</div>
				<EditUser user={user} />
			</div>
			<div className="flex items-center justify-center gap-4 px-2.5">
				<div className="rounded-full min-w-20 max-w-24 aspect-square outline-2 outline-primary overflow-hidden">
					<img
						src={user.image || profile}
						alt={`${user.name}'s profile`}
						className=" object-cover w-full h-full"
					/>
				</div>
				<div className="flex flex-col gap-2.5">
					<div className="flex items-center gap-2.5">
						<p className="font-bold text-xl">{user.name}</p>
						<span className="w-5 h-5">
							<img
								src={user.verified ? verified : unverified}
								alt=""
								className="w-full h-full object-contain"
							/>
						</span>
					</div>
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
					{readableNumber(user.debt)} IQD
				</p>
			</div>
		</div>
	);
};

export default UserCard;
