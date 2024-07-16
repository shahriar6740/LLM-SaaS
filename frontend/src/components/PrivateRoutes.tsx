import { Outlet, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

import ROUTES from "@/constants/Routes";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
	redirectTo?: string;
}

const PrivateRoutes = (props: ProtectedRouteProps) => {
	const { redirectTo = ROUTES.LOGIN } = props;
	const { isUserAuthenticated } = useAppContext();
	const navigate = useNavigate();

	const checkAuthentication = useCallback(async () => {
		try {
			await isUserAuthenticated();
		} catch (error) {
			console.error(error);
			toast.error("User needs to be logged in to view this page.");
			navigate(redirectTo, { replace: true });
		}
	}, [isUserAuthenticated]);

	useEffect(() => {
		void checkAuthentication();
	}, [checkAuthentication]);

	return <Outlet />;
};

export default PrivateRoutes;
