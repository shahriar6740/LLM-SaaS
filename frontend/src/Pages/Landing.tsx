import LandingPageNavBar from "@/components/LandingPageNavBar";
import Hero from "@/components/ui/Hero";
import Benefits from "@/components/Benefits";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

const Landing = () => {
	return (
		<section className="min-h-screen">
			<LandingPageNavBar />
			<Hero />
			<Benefits />
			<Features />
			<Pricing />
			<Footer />
		</section>
	);
};

export default Landing;
