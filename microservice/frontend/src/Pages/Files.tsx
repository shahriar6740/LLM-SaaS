import FileTable from "@/components/FileTable/FileTable";
import { Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import ROUTES from "@/constants/Routes";
import { Link } from "react-router-dom";

const items = [
	{ title: "Dashboard", link: ROUTES.DASHBOARD.BASE },
	{ title: "Files", link: ROUTES.DASHBOARD.FILES }
];

const Files = () => {

	return (
		<Fragment>
			<Breadcrumb>
				<BreadcrumbList>
					{items.map((item, index) => (
						<Fragment key={item.title}>
							{index !== items.length - 1 && (
								<BreadcrumbItem>
									<Link to={item.link} className="transition-colors hover:text-foreground">
										{item.title}
									</Link>
									{/*<BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>*/}
								</BreadcrumbItem>
							)}
							{index < items.length - 1 && (
								<BreadcrumbSeparator>
									<Slash />
								</BreadcrumbSeparator>
							)}
							{index === items.length - 1 && (
								<BreadcrumbPage>{item.title}</BreadcrumbPage>
							)}
						</Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
			<FileTable />
		</Fragment>
	);
};

export default Files;
