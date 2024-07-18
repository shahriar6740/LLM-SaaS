import { ReactElement } from "react";

export type SideBarItem = {
	title: string;
	icon: ReactElement;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	label?: string;
	description?: string;
}