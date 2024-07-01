import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import InputWithIcon from "@/components/ui/inputWithIcon";
import useToggle from "@/hooks/useToggle";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterForm } from "@/models/form/RegisterForm";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "@/constants/Routes.ts";
import { BackgroundBeams } from "@/components/BackgroundBeams";

const Register = () => {
	const [showPassword, toggleShowPassword] = useToggle(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<RegisterForm>({
		defaultValues: {
			email: "",
			name: "",
			password: "",
			username: ""
		}
	});

	const onRegister = useCallback(async (data: RegisterForm) => {
		try {
			setLoading(true);
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			navigate(ROUTES.CONFIRM_ACCOUNT);
		} catch (error) {
			toast.error(error?.message || "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	}, [navigate]);

	return (
		<BackgroundBeams>
			<div className="flex justify-center items-center w-screen h-screen">
				<div className="w-full px-10 md:w-1/2 md:px-0 lg:w-1/3 lg:px-0 xl:w-1/4 xl:px-0">
					<div className="flex items-center text-6xl justify-center my-6 select-none text-foreground z-20">
						🄲🄰🄳🄴🄽
					</div>
					<Card className="bg-transparent">
						<CardHeader>
							<CardTitle>Register</CardTitle>
							<CardDescription>Create your free account today to get started with CADEN</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit(onRegister)} id="register-form">
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-2">
										<Label htmlFor="name">Name</Label>
										<InputWithIcon
											{...register("name")}
											id="name"
											type="text"
											placeholder="Your name"
											prependIcon={<User size={18} />}
										/>
									</div>
									<div className="flex flex-col space-y-2">
										<Label htmlFor="username">Username</Label>
										<InputWithIcon
											id="username"
											type="text"
											placeholder="Your preferred username"
											{...register("username")}
											prependIcon={<CircleUserRound size={18} />}
										/>
									</div>
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
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex flex-col">
							<Button variant="default" className="p-2 w-full" type="submit" form="register-form">
								Register
							</Button>
							<span className="mt-4 text-xs mr-auto text-muted-foreground">By creating an account you agree to the terms and conditions.</span>
							<span className="mt-8 text-xs">Already have an account? <Link
								className="text-primary hover:underline decoration-primary"
								to={ROUTES.LOGIN}>Login</Link></span>
						</CardFooter>
					</Card>
				</div>
			</div>
		</BackgroundBeams>
	);
};

export default Register;
