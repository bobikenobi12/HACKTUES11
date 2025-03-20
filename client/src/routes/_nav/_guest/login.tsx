import { LoginForm } from "@/components/auth/login-form";
import { Box } from "@/components/primitives/box";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { useMessages } from "@/hooks/useMessages";
import { createFileRoute } from "@tanstack/react-router";

const LoginPage = () => {
	const { t } = useMessages("auth");

	return (
		<Section>
			<Container>
				<div className="flex flex-col items-center justify-center">
					<h1 className="mx-auto text-balance text-center text-6xl sm:w-1/3">
						{t("head.login.title")}
					</h1>
					<p className="mx-auto mb-14 mt-5 text-balance text-center leading-tight sm:w-1/3">
						{t("head.login.description")}
					</p>

					<div className="mx-auto flex w-2/3">
						<div className="w-full shrink-0 px-5">
							<Box>
								<LoginForm />
							</Box>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export const Route = createFileRoute("/_nav/_guest/login")({
	component: LoginPage,
});
