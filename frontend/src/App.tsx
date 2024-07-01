import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "@/context/AppContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ROUTES from "@/constants/Routes";
import Register from "@/Pages/Register";
import { Fragment } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

	return (
		<Fragment>
			<ToastContainer
				position="top-right"
				autoClose={false}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				theme="colored"
				pauseOnFocusLoss
				draggable
				pauseOnHover
				transition={Bounce}
			/>
			<BrowserRouter>
				<AppContextProvider>
					<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
						<Routes>
							<Route
								path={ROUTES.HOME}
								element={<Navigate to={ROUTES.HOME} replace />}
							/>
							<Route path={ROUTES.LOGIN} element={<div />} />
							<Route path={ROUTES.REGISTER} element={<Register />} />
						</Routes>
					</ThemeProvider>
				</AppContextProvider>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
