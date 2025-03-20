import i18n from "@/lib/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { useMessages } from "@/hooks/useMessages";
import { Link } from "@tanstack/react-router";
import { Loader } from "../primitives/loader";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

export interface LoginFormProps {
	navigateTo?: string;
}

const loginFormSchema = z.object({
	username: z.string({ required_error: i18n.t("auth:errors.username") }),
	password: z
		.string()
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|\W)/,
			i18n.t("auth:errors.password")
		)
		.min(8, i18n.t("auth:errors.passwordLength")),
	staySignedIn: z.boolean().default(false),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const LoginForm: React.FC<LoginFormProps> = ({ navigateTo }) => {
	const { t } = useMessages("auth");

	const { login } = useAuth(navigateTo || "/");
	// const navigate = useNavigate({ from: Route.fullPath });

	const form = useForm<LoginFormSchema>({
		resolver: zodResolver(loginFormSchema),
		mode: "onSubmit",
		shouldFocusError: false,
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = (values: LoginFormSchema) => {
		login.mutate(values);
	};

	return (
		<Loader isLoading={false}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					onKeyDown={(e) => {
						if (e.key === "Enter") form.handleSubmit(onSubmit)();
					}}
				>
					<h2 className="text-center text-3xl">
						{t("loginWithEmail")}
					</h2>

					<div className="my-5 flex flex-col gap-3">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("username.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t(
												"username.placeholder"
											)}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("password.label")}</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder={t(
												"password.placeholder"
											)}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex w-full justify-end">
							<Link to="/">{t("forgotPassword.title")}</Link>
						</div>
					</div>

					{/* TODO stay logged in */}

					<Button
						className="my-3 w-full"
						onClick={form.handleSubmit(onSubmit)}
					>
						{t("signIn")}
					</Button>

					<div className="max-w-lg my-3`">
						<Link to="/sign-up">
							<Button
								variant="link"
								className=" w-full underline"
							>
								{t("signUpPrompt")}
							</Button>
						</Link>
					</div>

					{/* TODO forgot password */}
				</form>
			</Form>
		</Loader>
	);
};
