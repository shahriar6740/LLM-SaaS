import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState
} from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { UserDetails } from "@/models/UserDetails";
import useScrollToAchor from "@/hooks/useScrollToAchor";

type AppContextType = {
	appLoading: boolean;
	setAppLoading: Dispatch<SetStateAction<boolean>>;
	isAuthenticated: boolean;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
	isUserAuthenticated: () => Promise<boolean>
	currentAuthenticatedUser: UserDetails | null;
};

const APP_CONTEXT_DEFAULT_VALUES: AppContextType = {
	currentAuthenticatedUser: null,
	appLoading: false,
	setAppLoading: () => {
	},
	isAuthenticated: false,
	setIsAuthenticated: () => {
	},
	isUserAuthenticated: async () => false
};
export const AppContext = createContext<AppContextType>(
	APP_CONTEXT_DEFAULT_VALUES
);

type AppContextProviderProps = {
	children: ReactNode;
};

export const AppContextProvider = (props: AppContextProviderProps) => {
	const { children } = props;
	const [appLoading, setAppLoading] = useState(APP_CONTEXT_DEFAULT_VALUES.appLoading);
	const [isAuthenticated, setIsAuthenticated] = useState(APP_CONTEXT_DEFAULT_VALUES.isAuthenticated);
	const [currentAuthenticatedUser, setCurrentAuthenticatedUser] = useState<UserDetails | null>(null);
	useScrollToAchor();

	const isUserAuthenticated = useCallback(async () => {
		try {
			setAppLoading(true);
			const currentUserData = await getCurrentUser();
			setIsAuthenticated(!!currentUserData);
			return !!currentUserData;
		} catch (error: any) {
			setIsAuthenticated(false);
			throw new Error(error.message);
		} finally {
			setAppLoading(false);
		}
	}, []);

	const getUserDetails = useCallback(async () => {
		try {
			setAppLoading(true);
			const userDetails = await fetchUserAttributes();
			setCurrentAuthenticatedUser({
				name: userDetails.name || "",
				email: userDetails.email || "",
				preferred_username: userDetails.preferred_username || ""
			});
		} catch (error) {
			setCurrentAuthenticatedUser(null);
		} finally {
			setAppLoading(false);
		}
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			void getUserDetails();
		}
	}, [getUserDetails, isAuthenticated]);

	return (
		<AppContext.Provider
			value={{
				setAppLoading,
				appLoading,
				isAuthenticated,
				setIsAuthenticated,
				isUserAuthenticated,
				currentAuthenticatedUser
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
