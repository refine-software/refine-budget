import { useNavigate } from "react-router";
import mail from "/mail.png"
import transaction from "/transaction.png"
import user from "/user.png"

type Control = {
	id: number;
	location: string;
	title: string;
	image: string;
}

const controls: Control[] = [
	{ id: 1, location: "/manage-emails", title: "Allowed Emails", image: mail },
	{ id: 2, location: "/transactions", title: "Transactions", image: transaction },
	{ id: 3, location: "/users", title: "Users", image: user },
];

const Control = () => {

	return (
		<div className="grid grid-cols-2 gap-3">
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
			className="flex flex-col justify-center items-center gap-3 p-2 bg-grey rounded-3xl w-full aspect-square font-bold text-lg shadow-2xl cursor-pointer hover:bg-primary"
			onClick={() => navigate(control.location)}
			key={control.id}
		>
			<img src={control.image} alt={control.title} className={`h-[50%] ${control.id === 3 && "my-2"}`} />
			<div className="h-14 flex justify-center items-center">{control.title}</div>
		</button>
	)
}

export default Control;
