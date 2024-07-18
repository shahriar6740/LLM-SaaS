import { signOut } from "aws-amplify/auth";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import ROUTES from "@/constants/Routes";
import { Button } from "@/components/ui/button";
import { UserDetails } from "@/models/UserDetails";
import { useAppContext } from "@/context/AppContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserNavigationProps = {
	user: UserDetails;
}

export function UserNavigation(props: UserNavigationProps) {
	const { user } = props;
	const { onUserLogout, setAppLoading, appLoading } = useAppContext();
	const navigate = useNavigate();

	const logout = useCallback(async () => {
		try {
			setAppLoading(true);
			await signOut({ global: true });
			onUserLogout();
			navigate(ROUTES.LOGIN);
		} catch (error: any) {
			console.log(error.message);
		} finally {
			setAppLoading(false);
		}
	}, [setAppLoading, onUserLogout, navigate]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarFallback className="uppercase bg-primary text-primary-foreground">
							{user.preferred_username.length > 1 ? user.preferred_username.slice(0, 2) : user.preferred_username.slice(0, 1)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{user.preferred_username}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link to={ROUTES.DASHBOARD.BASE} className="w-full">
							Dashboard
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={logout} disabled={appLoading} className="cursor-pointer">
					Signout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
