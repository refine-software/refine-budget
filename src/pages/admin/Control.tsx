import { useNavigate } from "react-router";
import mail from "/mail.png"
import transaction from "/transaction.png"
import user from "/user.png"

type Control = {
	location: string;
	title: string;
	image: string;
}

const controls: Control[] = [
	{ location: "/manage-emails", title: "Allowed Emails", image: mail },
	{ location: "/transactions", title: "Transactions", image: transaction },
	{ location: "/users", title: "Users", image: user },
];

const Control = () => {

	return (
		<div className="grid grid-cols-2 gap-5">
			{controls.map((control) => {
				return ControlBtn({ control })
			})}
		</div>
	);
};

const ControlBtn = ({ control }: { control: Control }) => {
	const navigate = useNavigate();
	return (
		<button
			className="flex flex-col justify-center items-center gap-4 bg-grey rounded-3xl w-full aspect-square font-bold text-lg shadow-2xl cursor-pointer hover:bg-primary"
			onClick={() => navigate(control.location)}
		>
			<img src={control.image} alt={control.title} className="h-[50%]" />
			<p>{control.title}</p>
		</button>
	)
}

export default Control;
