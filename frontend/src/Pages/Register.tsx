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
import { Link } from "react-router-dom";
import ROUTES from "@/constants/Routes.ts";

const Register = () => {
	const [showPassword, toggleShowPassword] = useToggle(false);
	const [loading, setLoading] = useState(false);
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
					reject();
				});
			});
		} catch (error) {
			toast.error(error?.message || "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<div className="grid grid-cols-[1fr_1fr] items-center h-screen w-2/3 mx-auto gap-x-8">
			<div className="flex flex-col justify-start">
				<div className="flex items-center text-6xl justify-center">
					🄲🄰🄳🄴🄽
				</div>
			</div>
			<div className="max-w-2xl">
				<Card>
					<CardHeader>
						<CardTitle>Register</CardTitle>
						<CardDescription>Create your free account today</CardDescription>
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
						<span className="mt-8 text-xs">Already have an account? <Link className="text-primary"
																																					to={ROUTES.LOGIN}>Login</Link></span>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default Register;
