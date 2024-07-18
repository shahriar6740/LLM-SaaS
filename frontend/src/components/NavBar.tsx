import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import ROUTES from "@/constants/Routes";
import { useAppContext } from "@/context/AppContext";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { LandingPageNavLinks } from "@/models/LandingPageNavLinks";
import useRelativeRouteMatch from "@/hooks/useRelativeRouteMatch";
import { UserNavigation } from "@/components/UserNavigation";

const navLinks: LandingPageNavLinks[] = [
	{
		title: "Benefits",
		link: "#benefits"
	},
	{
		title: "Features",
		link: "#features"
	},
	{
		title: "Pricing",
		link: "#pricing"
	},
	{
		title: "Dashboard",
		link: ROUTES.DASHBOARD.BASE,
		private: true
	}
];

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { isUserAuthenticated, currentAuthenticatedUser, setAppLoading, isAuthenticated } = useAppContext();
	const landingPageRouteMatch = useRelativeRouteMatch(ROUTES.LANDING);
	const loginRouteMatch = useRelativeRouteMatch(ROUTES.LOGIN);
	const registerRouteMatch = useRelativeRouteMatch(ROUTES.REGISTER);

	const checkAuthentication = useCallback(async () => {
		try {
			setAppLoading(true);
			await isUserAuthenticated();
		} catch (error: any) {
			console.log(error);
		} finally {
			setAppLoading(false);
		}
	}, [isUserAuthenticated]);

	useEffect(() => {
		void checkAuthentication();
	}, [checkAuthentication]);

	return [loginRouteMatch, registerRouteMatch].every(match => !match) ?
		<header
			className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
			<Link to={ROUTES.LANDING} className="font-bold text-3xl">
				🄲🄰🄳🄴🄽
			</Link>
			{/* <!-- Mobile --> */}
			<div className="flex items-center lg:hidden">
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Menu
							onClick={() => setIsOpen(!isOpen)}
							className="cursor-pointer lg:hidden"
						/>
					</SheetTrigger>

					<SheetContent
						side="left"
						className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
					>
						<div>
							<SheetHeader className="mb-4 ml-4">
								<SheetTitle className="flex items-center">
									<Link to={ROUTES.LANDING}>
										🄲🄰🄳🄴🄽
									</Link>
								</SheetTitle>
							</SheetHeader>

							<div className="flex flex-col gap-2">
								{
									navLinks.map(({ link, title }) => (
										<Button
											key={title}
											onClick={() => setIsOpen(false)}
											asChild
											variant="ghost"
											className="justify-start text-base"
										>
											<Link to={link}>{title}</Link>
										</Button>
									))
								}
							</div>
						</div>

						<SheetFooter className="flex-col sm:flex-col justify-start items-start">
							<Separator className="mb-2" />

							{/*<ToggleTheme />*/}
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>

			{/* <!-- Desktop --> */}
			<NavigationMenu className="hidden lg:block mx-auto">
				<NavigationMenuList>
					<NavigationMenuItem>
						{landingPageRouteMatch &&
							navLinks
								.filter((item) => !item.private || item.private && isAuthenticated)
								.map(({ link, title }) => (
									<NavigationMenuLink key={link} asChild>
										<Link to={link} className="text-base px-2">
											{title}
										</Link>
									</NavigationMenuLink>
								))}
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<div className="hidden lg:flex gap-x-4">
				{/*<ToggleTheme />*/}
				{
					isAuthenticated && currentAuthenticatedUser ?
						<UserNavigation user={currentAuthenticatedUser} />
						:
						<Fragment>
							<Button asChild size="sm" variant="ghost" aria-label="Login"
											className="text-base hover:bg-primary hover:text-primary-foreground p-1">
								<Link aria-label="Login" to={ROUTES.LOGIN}>Login</Link>
							</Button>
							<Button asChild size="sm" variant="ghost" aria-label="Register"
											className="text-base hover:bg-primary hover:text-primary-foreground p-1">
								<Link aria-label="Register" to={ROUTES.REGISTER}>Register</Link>
							</Button>
						</Fragment>
				}
			</div>
		</header>
		: null;
};

export default NavBar;
