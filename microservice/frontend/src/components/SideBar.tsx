import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { SideBarNavLinks } from "@/constants/SideBarNavLinks";
import { useAppContext } from "@/context/AppContext";
import SideBarItems from "@/components/SideBarItems";

type SideBarProps = {
	className?: string;
};

export default function SideBar({ className }: SideBarProps) {
	const { sideBarOpen, setSideBarOpen } = useAppContext();
	const [status, setStatus] = useState(false);

	const handleToggle = () => {
		setStatus(true);
		setSideBarOpen(prev => !prev);
		setTimeout(() => setStatus(false), 500);
	};

	return (
		<aside
			className={cn(
				`relative hidden h-[800px] flex-none border-r z-10 md:flex md:items-center`,
				status && "duration-500",
				sideBarOpen ? "w-56" : "w-[72px]",
				className
			)}
		>
			<ChevronLeft
				className={cn(
					"absolute -right-3 top-1/2 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
					!sideBarOpen && "rotate-180"
				)}
				onClick={handleToggle}
			/>
			<div className="space-y-4">
				<div className="px-3 py-2">
					<div className="mt-4 space-y-1">
						<SideBarItems items={SideBarNavLinks} />
					</div>
				</div>
			</div>
		</aside>
	);
}
