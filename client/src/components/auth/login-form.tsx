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
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
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
	className?: string;
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

export const LoginForm: React.FC<LoginFormProps> = ({
	navigateTo,
	className,
	...props
}) => {
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
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>{t("oauth.loginPrompt")}</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							onKeyDown={(e) => {
								if (e.key === "Enter")
									form.handleSubmit(onSubmit)();
							}}
						>
							<div className="grid gap-6">
								<div className="flex flex-col gap-4">
									<Button
										variant="outline"
										className="w-full"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
										>
											<path
												d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
												fill="currentColor"
											/>
										</svg>
										Login with Apple
									</Button>
									<Button
										variant="outline"
										className="w-full"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
										>
											<path
												d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
												fill="currentColor"
											/>
										</svg>
										Login with Google
									</Button>
								</div>
								<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
									<span className="relative z-10 bg-background px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>
								<div className="grid gap-6">
									<div className="grid gap-2">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														{t("username.label")}
													</FormLabel>
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
									</div>
									<div className="grid gap-2">
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<div className="flex items-center">
														<FormLabel>
															{t(
																"password.label"
															)}
														</FormLabel>
														<a
															href="#"
															className="ml-auto text-sm underline-offset-4 hover:underline"
														>
															{t(
																"forgotPassword.title"
															)}
														</a>
													</div>
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
									</div>
									<Button type="submit" className="w-full">
										{t("signIn")}
									</Button>
								</div>
								<div className="text-center text-sm">
									{t("signUpPrompt")}{" "}
									<Link
										to="/sign-up"
										className="underline underline-offset-4"
									>
										{t("signUp")}
									</Link>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				By clicking continue, you agree to our{" "}
				<a href="#">Terms of Service</a> and{" "}
				<a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
};
