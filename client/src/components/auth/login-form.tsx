import i18n from "@/lib/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import { useNavigate, useRouter } from "@tanstack/react-router";
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

export interface LoginFormProps {}

const loginFormSchema = z.object({
	email: z.string().email(i18n.t("auth:errors.email")),
	password: z
		.string()
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|\W)/,
			i18n.t("auth:errors.password")
		)
		.min(8, i18n.t("auth:errors.passwordLength")),
	staySignedIn: z.boolean().default(false),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const LoginForm: React.FC<LoginFormProps> = () => {
	const { t } = useMessages("auth");

	// const navigate = useNavigate({ from: Route.fullPath });
	// const search = Route.useSearch();
	// const router = useRouter();

	const form = useForm<LoginFormSchema>({
		resolver: zodResolver(loginFormSchema),
		mode: "onSubmit",
		shouldFocusError: false,
		defaultValues: {
			email: "",
			password: "",
		},
	});

	//   const {
	//     mutate: login,
	//     isPending,
	//     // error,
	//   } = useMutation({
	//     mutationFn: async (values: LoginFormSchema) => {
	//       const { data, error } = await supabase.auth.signInWithPassword({
	//         email: values.email,
	//         password: values.password,
	//       });

	//       if (error) {
	//         toast({
	//           title: t("errors.login"),
	//           description: error.message,
	//           type: "foreground",
	//           variant: "destructive",
	//         });
	//         return;
	//       }

	//       // search.redirect
	//       //   ? router.history.push(search.redirect)
	//       navigate({ to: "" });

	//       localStorage.setItem("autoRefreshToken", values.staySignedIn.toString());

	//       toast({
	//         title: t("loginSuccess.title", {
	//           email: data.user?.email ?? "",
	//         }),
	//         description: t("loginSuccess.description"),
	//         type: "foreground",
	//       });

	//       return data;
	//     },
	//   });

	const onSubmit = (values: LoginFormSchema) => {
		// login(values);
		console.log(values);
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("email.label")}</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder={t("email.placeholder")}
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

					<div className="my-3 w-full">
						<Link to="/sign-up">
							<Button className="w-full underline">
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
