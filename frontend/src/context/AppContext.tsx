import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type AppContextType = {
	appLoading: boolean;
	setAppLoading: Dispatch<SetStateAction<boolean>>;
};

const APP_CONTEXT_DEFAULT_VALUES: AppContextType = {
	appLoading: false,
	setAppLoading: () => {
	}
};
export const AppContext = createContext<AppContextType>(
	APP_CONTEXT_DEFAULT_VALUES
);

type AppContextProviderProps = {
	children: ReactNode;
};

export const AppContextProvider = (props: AppContextProviderProps) => {
	const { children } = props;
	const [appLoading, setAppLoading] = useState(false);

	return (
		<AppContext.Provider
			value={{
				setAppLoading,
				appLoading
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
