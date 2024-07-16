import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blocks, BookText, Scaling, Smile } from "lucide-react";

const Benefits = () => {
	return (
		<section id="benefits" className="container py-24 sm:py-32">
			<div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
				<div>
					<h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Your Shortcut to Success
					</h2>
					<p className="text-xl text-muted-foreground mb-8">
						From setup to integration, our APIs provide everything you need to manage efficient, context-aware chatbots.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-4 w-full">
					<Card className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number">
						<CardHeader>
							<div className="flex justify-between">
								<Blocks />
								<span
									className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    01
                  </span>
							</div>

							<CardTitle>Easy Integration</CardTitle>
						</CardHeader>

						<CardContent className="text-muted-foreground">
							Easily integrate our seamless APIs into your application to leverage the power of AI
						</CardContent>
					</Card>
					<Card className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number">
						<CardHeader>
							<div className="flex justify-between">
								<Scaling />
								<span
									className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    02
                  </span>
							</div>

							<CardTitle>Scalable Solutions</CardTitle>
						</CardHeader>

						<CardContent className="text-muted-foreground">
							Our APIs scale along with the amount of data you upload
						</CardContent>
					</Card>
					<Card className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number">
						<CardHeader>
							<div className="flex justify-between">
								<BookText />
								<span
									className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    03
                  </span>
							</div>

							<CardTitle>Robust Documentation and Support</CardTitle>
						</CardHeader>

						<CardContent className="text-muted-foreground">
							Our application provides robust documentation and support for integrating the APIs.
						</CardContent>
					</Card>
					<Card className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number">
						<CardHeader>
							<div className="flex justify-between">
								<Smile />
								<span
									className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    04
                  </span>
							</div>

							<CardTitle>Enhance Customer Experience</CardTitle>
						</CardHeader>

						<CardContent className="text-muted-foreground">
							Enhance customer interaction and experience of your business by leveraging the power of AI
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default Benefits;
