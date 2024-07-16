import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";

type AppContextType = {
	appLoading: boolean;
	setAppLoading: Dispatch<SetStateAction<boolean>>;
	isAuthenticated: boolean;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
	isUserAuthenticated: () => Promise<boolean>
};

const APP_CONTEXT_DEFAULT_VALUES: AppContextType = {
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

	const isUserAuthenticated = async () => {
		try {
			const currentUserData = await getCurrentUser();
			setIsAuthenticated(!!currentUserData);
			return !!currentUserData;
		} catch (error: any) {
			setIsAuthenticated(false);
			throw new Error(error.message);
		}
	};

	return (
		<AppContext.Provider
			value={{
				setAppLoading,
				appLoading,
				isAuthenticated,
				setIsAuthenticated,
				isUserAuthenticated
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
