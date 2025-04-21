import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const DebtMoney = () => {
    const auth = useContext(AuthContext);
    return (
        <p className="text-primary text-3xl font-bold">{auth.user.debt} IQD</p>
    )
}

export default DebtMoney;