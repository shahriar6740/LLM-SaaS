import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

import ROUTES from "@/constants/Routes";
import { Button } from "@/components/ui/button";

const Home = () => {
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await signOut({ global: true });
			navigate(ROUTES.LOGIN);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<div>
			Home
			<Button onClick={logout}>Logout</Button>
		</div>
	);
};

export default Home;
