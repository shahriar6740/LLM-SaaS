import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ConfirmAccountForm } from "@/models/form/ConfirmAccountForm";

const ConfirmAccount = () => {
	const [timer, setTimer] = useState(0);
	const [loading, setLoading] = useState(false);
	const [codeSent, setCodeSent] = useState(false);
	const { handleSubmit, control } = useForm<ConfirmAccountForm>({
		defaultValues: {
			otp: ""
		}
	});

	const onResendOtp = useCallback(async () => {
		try {
			setLoading(true);
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve();
				}, 1000);
			});
			setTimer(3 * 60);
			setCodeSent(true);
		} catch (error) {

		} finally {
			setLoading(false);
		}

	}, []);

	const onConfirm = useCallback(async (data: ConfirmAccountForm) => {
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

	useEffect(() => {
		let interval;
		if (timer > 0) {
			console.log(timer);
			interval = setInterval(() => {
				console.log("hello");
				setTimer(prev => prev - 1);
			}, 1000);
		} else {
			setCodeSent(false);
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [timer]);

	console.log(timer);

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
												<InputOTP {...field} maxLength={5}>
													<InputOTPGroup>
														<InputOTPSlot index={0} />
														<InputOTPSlot index={1} />
														<InputOTPSlot index={2} />
														<InputOTPSlot index={3} />
														<InputOTPSlot index={4} />
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
								<span className="mt-8 text-xs">A code has been sent. Resend code in {" "}
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
