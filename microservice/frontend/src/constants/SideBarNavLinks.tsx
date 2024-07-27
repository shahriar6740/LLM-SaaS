import { SideBarItem } from "@/models/SideBarItem";
import { BookText, FileStack, MessagesSquare } from "lucide-react";
import ROUTES from "@/constants/Routes";

export const SideBarNavLinks: SideBarItem[] = [
	{
		title: "Files",
		href: ROUTES.DASHBOARD.FILES,
		icon: <FileStack />,
		label: "Files"
	},
	{
		title: "AI Chat",
		href: ROUTES.DASHBOARD.CHAT,
		icon: <MessagesSquare />,
		label: "AI Chat"
	},
	{
		title: "Documentation",
		href: ROUTES.DASHBOARD.DOCUMENTATION,
		icon: <BookText />,
		label: "Documentation"
	}
];