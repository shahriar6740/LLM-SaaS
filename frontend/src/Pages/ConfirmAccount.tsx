import { toast } from "react-toastify";
import { autoSignIn, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

import ROUTES from "@/constants/Routes";
import { Button } from "@/components/ui/button";
import { ConfirmAccountForm } from "@/models/form/ConfirmAccountForm";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";

const ConfirmAccount = () => {
	const { isUserAuthenticated } = useAppContext();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [timer, setTimer] = useState(0);
	const [loading, setLoading] = useState(false);
	const { handleSubmit, control } = useForm<ConfirmAccountForm>({
		defaultValues: {
			otp: ""
		}
	});

	const onResendOtp = useCallback(async () => {
		try {
			setLoading(true);
			console.log("resending");
			await resendSignUpCode({ username: searchParams.get("email") || "" });
			setTimer(3 * 60);
		} catch (error) {

		} finally {
			setLoading(false);
		}

	}, []);

	const onConfirm = useCallback(async (data: ConfirmAccountForm) => {
		try {
			setLoading(true);
			const { nextStep, isSignUpComplete } = await confirmSignUp({
				username: searchParams.get("email") || "",
				confirmationCode: data.otp
			});
			if (isSignUpComplete && nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
				const autoSignInData = await autoSignIn();
				if (autoSignInData.isSignedIn && autoSignInData.nextStep.signInStep === "DONE") {
					const authenticated = await isUserAuthenticated();
					if (authenticated) {
						navigate(ROUTES.DASHBOARD.BASE);
					}
				}
			}
		} catch (error: any) {
			toast.error(error?.message || "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	}, [isUserAuthenticated, navigate]);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (timer > 0) {
			interval = setInterval(() => {
				setTimer(prev => prev - 1);
			}, 1000);
		} else {
			// @ts-ignore
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [timer]);

	return (
		<div className="flex justify-center items-center w-screen h-screen">
			<div className="w-full px-10 md:w-1/2 md:px-0 lg:w-1/3 lg:px-0 xl:w-1/4 xl:px-0">
				<div className="flex items-center text-6xl justify-center my-6 select-none text-foreground z-20">
					🄲🄰🄳🄴🄽
				</div>
				<Card className="bg-transparent">
					<CardHeader>
						<CardTitle>OTP Verification</CardTitle>
						<CardDescription>A one time code has been sent to your email address: </CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onConfirm)} id="register-form">
							<div className="grid w-full items-center gap-4">
								<div className="flex justify-center space-y-2">
									<Controller
										name="otp"
										control={control}
										render={({ field }) => {
											return (
												<InputOTP {...field} maxLength={6}>
													<InputOTPGroup>
														<InputOTPSlot index={0} />
														<InputOTPSlot index={1} />
														<InputOTPSlot index={2} />
														<InputOTPSlot index={3} />
														<InputOTPSlot index={4} />
														<InputOTPSlot index={5} />
													</InputOTPGroup>
												</InputOTP>
											);
										}}
									/>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex flex-col">
						<Button variant="default" className="p-2 w-full" type="submit" form="register-form" disabled={loading}>
							Confirm
						</Button>
						{
							timer > 0 ? (
								<span className="mt-8 text-xs">A code has been sent. Resend code again in {" "}
									<span className="">{~~(timer / 60)}m:{timer % 60}s</span>
								</span>
							) : (
								<span className="mt-8 text-xs">Didn't receive a code? {" "}
									<Button
										className="text-primary hover:underline decoration-primary text-xs hover:bg-transparent hover:text-primary"
										variant="ghost"
										onClick={onResendOtp}
									>
										Resend OTP
									</Button>
								</span>
							)
						}
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default ConfirmAccount;
