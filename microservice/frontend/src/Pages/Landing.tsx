import Hero from "@/components/ui/Hero";
import Benefits from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing";
import { Features } from "@/components/Features";

const Landing = () => {
	return (
		<section className="min-h-screen">
			<Hero />
			<Benefits />
			<Features />
			<Pricing />
			<Footer />
		</section>
	);
};

export default Landing;
