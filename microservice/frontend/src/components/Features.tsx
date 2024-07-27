import {
	Blocks,
	BotMessageSquare,
	BrainCircuit,
	FileStack,
	FileText,
	LayoutDashboard,
	MonitorSmartphone,
	ShieldCheck
} from "lucide-react";
import { Feature } from "@/models/Feature";
import { cn } from "@/lib/utils";

const featureList: Feature[] = [
	{
		icon: <BrainCircuit />,
		title: "Customizable LLMs",
		description:
			"Train AI LLM models using your own documents to create chatbots tailored to your business needs."
	},
	{
		icon: <FileStack />,
		title: "Document Management",
		description:
			"Upload, manage, delete your documents in one place easily"
	},
	{
		icon: <Blocks />,
		title: "API Integration",
		description:
			"Easy-to-use API endpoints for seamless integration with your applications and platforms."
	},
	{
		icon: <FileText />,
		title: "Robust Support & Documentation",
		description:
			"Access comprehensive documentation and customer support for integration and troubleshooting."
	},
	{
		icon: <ShieldCheck />,
		title: "Security and Compliance",
		description:
			"Ensure data security and compliance with industry standards and regulations."
	},
	{
		icon: <BotMessageSquare />,
		title: "Interactive Chat Interface",
		description:
			"We provide an interactive and intuitive chat interface for test usage."
	},
	{
		icon: <MonitorSmartphone />,
		title: "Device agnostic",
		description:
			"Provide an application that is agnostic to OS, devices and screen size"
	},
	{
		icon: <LayoutDashboard />,
		title: "User-Friendly Dashboard",
		description:
			"Manage and monitor your AI models, documents, and API usage through an intuitive dashboard."
	}
];

export const Features = () => {
	return (
		<section id="features" className="container py-24 sm:py-32">
			<h2 className="text-lg text-primary text-center mb-2 tracking-wider">
				Features
			</h2>

			<h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
				What Makes Us Different
			</h2>

			<h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
				Our platform allows you to train AI models specifically on your own documents, ensuring that the LLMs understand
				and respond with contextually accurate information unique to your business.
			</h3>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
				{featureList.map(({ icon, title, description }, index) => (
					<div
						key={title}
						className={cn(
							"flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
							(index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
							index < 4 && "lg:border-b dark:border-neutral-800"
						)}
					>
						{index < 4 && (
							<div
								className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
						)}
						{index >= 4 && (
							<div
								className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
						)}
						<div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
							{icon}
						</div>
						<div className="text-lg font-bold mb-2 relative z-10 px-10">
							<div
								className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
							<span
								className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          				{title}
        				</span>
						</div>
						<p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
							{description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};
