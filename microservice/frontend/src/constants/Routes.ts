const ROUTES = {
	// Add app router routes here
	// STEPPER_FORM: {
	//   BASE: "/form",
	//   APPLICANT_INFORMATION: "applicant-information",
	//   TRANSPORT_AND_INSURANCE: "transport-and-insurance",
	//   ADD_EVENTS: "add-events",
	//   REVIEW_AND_SUBMIT: "review-and-submit",
	// },
	REGISTER: "/register",
	LOGIN: "/login",
	LANDING: "/",
	DASHBOARD: {
		BASE: "/dashboard",
		FILES: "files",
		DOCUMENTATION: "docs",
		CHAT: "chat"
	},
	CONFIRM_ACCOUNT: (username?: string, email?: string) => username && email ? `/confirm-account?username=${username}&email=${email}` : "/confirm-account",
	FORGET_PASSWORD: "/forget-password"
};

export default ROUTES;
