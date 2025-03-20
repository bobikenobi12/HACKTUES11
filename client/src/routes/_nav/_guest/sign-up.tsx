import { SignUpForm } from "@/components/forms/sign-up-form";
import { createFileRoute } from "@tanstack/react-router";

const SignUpPage = () => {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<SignUpForm />
			</div>
		</div>
	);
};

export const Route = createFileRoute("/_nav/_guest/sign-up")({
	component: SignUpPage,
});
