import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeContextProviderProps = {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeContextType = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const THEME_CONTEXT_DEFAULT_VALUES: ThemeContextType = {
	theme: "system",
	setTheme: () => null
};

const ThemeProviderContext = createContext<ThemeContextType>(
	THEME_CONTEXT_DEFAULT_VALUES
);

export function ThemeProvider(props: ThemeContextProviderProps) {
	const {
		children,
		defaultTheme = "system",
		storageKey = "vite-ui-theme"
	} = props;

	const [theme, setTheme] = useState<Theme>(() => {
		return localStorage.getItem(storageKey) as Theme ?? defaultTheme;
	});

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");
		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		}
	};

	return (
		<ThemeProviderContext.Provider value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
