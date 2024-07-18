import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBar from "@/components/SideBar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
	const navigate = useNavigate();
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<div className="flex pt-16">
			<SideBar />
			<main className="flex-1 overflow-hidden">
				<ScrollArea className="h-full">
					<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
						<Outlet />
					</div>
				</ScrollArea>
			</main>
		</div>
	);
};

export default Dashboard;
