import { Amplify } from "aws-amplify";
import { Fragment } from "react";
import { defaultStorage } from "aws-amplify/utils";
import { Bounce, ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import "react-toastify/dist/ReactToastify.css";

import Login from "@/Pages/Login";
import ROUTES from "@/constants/Routes";
import Register from "@/Pages/Register";
import ConfirmAccount from "@/Pages/ConfirmAccount";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppContextProvider } from "@/context/AppContext";
import Home from "@/Pages/Home";

Amplify.configure({
	Auth: {
		Cognito: {
			identityPoolId: "",
			//  Amazon Cognito User Pool ID
			userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID,
			// OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
			userPoolClientId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_CLIENT_ID
			// OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
			// 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
		}
	}
});
cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

function App() {
	console.log(import.meta.env.AWS_COGNITO_USER_POOL_ID);

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
							<Route path={ROUTES.HOME} element={<Home />} />
							<Route path={ROUTES.LOGIN} element={<Login />} />
							<Route path={ROUTES.REGISTER} element={<Register />} />
							<Route path={ROUTES.CONFIRM_ACCOUNT()} element={<ConfirmAccount />} />
						</Routes>
					</ThemeProvider>
				</AppContextProvider>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
