import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { signIn } from "aws-amplify/auth";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import ROUTES from "@/constants/Routes";
import { Label } from "@/components/ui/label";
import useToggle from "@/hooks/useToggle";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/models/form/LoginForm";
import InputWithIcon from "@/components/ui/inputWithIcon";
import { useAppContext } from "@/context/AppContext";
import { BackgroundBeams } from "@/components/BackgroundBeams";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
	const navigate = useNavigate();
	const { isUserAuthenticated } = useAppContext();
	const [showPassword, toggleShowPassword] = useToggle(false);
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit } = useForm<LoginForm>({
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onLogin = useCallback(async (data: LoginForm) => {
		try {
			setLoading(true);
			const userInfo = await signIn({
				username: data.email,
				password: data.password
			});
			if (userInfo.isSignedIn && userInfo.nextStep.signInStep === "DONE") {
				const authenticated = await isUserAuthenticated();
				if (authenticated) {
					navigate(ROUTES.DASHBOARD.BASE);
				}
			}
		} catch (error: any) {
			toast.error(error?.message || "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	}, [isUserAuthenticated, navigate]);

	return (
		<BackgroundBeams>
			<div className="flex justify-center items-center w-screen h-screen">
				<div className="w-full px-10 md:w-1/2 md:px-0 lg:w-1/3 lg:px-0 xl:w-1/4 xl:px-0">
					<div className="flex items-center text-6xl justify-center my-6 select-none text-foreground">
						🄲🄰🄳🄴🄽
					</div>
					<Card className="bg-transparent">
						<CardHeader>
							<CardTitle>Login</CardTitle>
							<CardDescription>Welcome! Login to your account to get started using CADEN</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit(onLogin)} id="login-form">
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-2">
										<Label htmlFor="email">Email</Label>
										<InputWithIcon
											id="email"
											type="email"
											placeholder="Your email"
											prependIcon={<Mail size={18} />}
											{...register("email")}
										/>
									</div>
									<div className="flex flex-col space-y-2">
										<Label htmlFor="password">Password</Label>
										<InputWithIcon
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Your password"
											prependIcon={<LockKeyhole size={18} />}
											{...register("password")}
											appendIcon={
												showPassword ?
													<EyeOff size={18} onClick={toggleShowPassword} />
													:
													<Eye onClick={toggleShowPassword} size={18} />
											}
										/>
									</div>
									<Link className="text-right w-full text-xs text-primary hover:underline decoration-primary"
												to={ROUTES.REGISTER}>Forgot password?</Link>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex flex-col">
							<Button variant="default" className="p-2 w-full" type="submit" form="login-form" disabled={loading}>
								Login
							</Button>
							<span className="mt-8 text-xs">Don't have an account? {" "}
								<Link className="text-primary hover:underline decoration-primary"
											to={ROUTES.REGISTER}>Register</Link></span>
						</CardFooter>
					</Card>
				</div>
			</div>
		</BackgroundBeams>
	);
};

export default Login;
