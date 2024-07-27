import { Dispatch, SetStateAction, useCallback } from "react";
import { SideBarItem } from "@/models/SideBarItem";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ROUTES from "@/constants/Routes";
import { useAppContext } from "@/context/AppContext";

type SideBarItemsProps = {
	items: SideBarItem[];
	setOpen?: Dispatch<SetStateAction<boolean>>;
	isMobileNav?: boolean;
}

const SideBarItems = (props: SideBarItemsProps) => {
	const { sideBarOpen, setSideBarOpen } = useAppContext();
	const { items, isMobileNav } = props;
	const location = useLocation();

	const matchPath = useCallback((path: string) => {
		return location.pathname.includes(path);
	}, [location]);

	return (
		<nav className="grid items-start gap-2">
			<TooltipProvider>
				{items.map((item, index) => {
					return (
						item.href && (
							<Tooltip key={index}>
								<TooltipTrigger asChild>
									<Link
										to={item.disabled ? ROUTES.LANDING : item.href}
										className={cn(
											"flex my-1 items-center gap-3 overflow-hidden rounded-md p-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground",
											matchPath(item.href) ? "bg-accent" : "transparent",
											item.disabled && "cursor-not-allowed opacity-80"
										)}
										onClick={() => {
											setSideBarOpen?.(false);
										}}
									>
										{item.icon}
										{
											isMobileNav || (sideBarOpen && !isMobileNav) &&
											<span className="mr-2 truncate text-lg">{item.title}</span>
										}
									</Link>
								</TooltipTrigger>
								<TooltipContent
									align="center"
									side="right"
									sideOffset={8}
									className={sideBarOpen ? "hidden" : "inline-block"}
								>
									{item.title}
								</TooltipContent>
							</Tooltip>
						)
					);
				})}
			</TooltipProvider>
		</nav>
	);
};

export default SideBarItems;
