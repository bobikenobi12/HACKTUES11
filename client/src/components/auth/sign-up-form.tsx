import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SignUpFormValues } from "@/hooks/use-auth";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Separator } from "../ui/separator";

import {
	lowercaseRegex,
	signUpFormSchema,
	specialCharsRegex,
	uppercaseRegex,
} from "@/hooks/use-auth";
import { useMessages } from "@/hooks/useMessages";
import { Link } from "@tanstack/react-router";
import { CircleCheck, CircleX } from "lucide-react";
import { Chip } from "../primitives/chip";
import { Loader } from "../primitives/loader";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export interface SignUpFormProps {}

export const SignUpForm: React.FC<SignUpFormProps> = () => {
	const { t } = useMessages("auth");
	// const navigate = useNavigate({ from: Route.fullPath });
	// const { signUp } = useAuth("/check-your-email");

	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpFormSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			password: "",
			newsletter: false,
		},
	});
	const watchedPassword = form.watch("password");

	const onSubmit = (values: SignUpFormValues) => {
		// signUp.mutate(values);
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
						{t("signUpWithEmail")}
					</h2>

					<div className="my-5 flex flex-col gap-3">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fullName.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t(
												"fullName.placeholder"
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
					</div>

					<div className="flex flex-wrap text-sm leading-none">
						<div className="flex w-1/2 items-center gap-1 py-1 pr-2">
							{watchedPassword.length >= 8 ? (
								<CircleCheck className="size-6 shrink-0 text-accent" />
							) : (
								<CircleX className="size-6 shrink-0 text-destructive" />
							)}
							{t("passwordRequirements.minLength")}
						</div>

						<div className="flex w-1/2 items-center gap-1 py-1 pr-2">
							{watchedPassword.match(specialCharsRegex) ? (
								<CircleCheck className="size-6 shrink-0 text-accent" />
							) : (
								<CircleX className="size-6 shrink-0 text-destructive" />
							)}
							{t("passwordRequirements.specialChar")}
						</div>

						<div className="flex w-1/2 items-center gap-1 py-1 pr-2">
							{watchedPassword.match(lowercaseRegex) ? (
								<CircleCheck className="size-6 shrink-0 text-accent" />
							) : (
								<CircleX className="size-6 shrink-0 text-destructive" />
							)}
							{t("passwordRequirements.lowercase")}
						</div>

						<div className="flex w-1/2 items-center gap-1 py-1 pr-2">
							{watchedPassword.match(uppercaseRegex) ? (
								<CircleCheck className="size-6 shrink-0 text-accent" />
							) : (
								<CircleX className="size-6 shrink-0 text-destructive" />
							)}
							{t("passwordRequirements.uppercase")}
						</div>
					</div>

					<Separator className="my-5" />

					<div className="my-5 gap-2">
						<FormField
							control={form.control}
							name="newsletter"
							render={({ field }) => (
								<FormItem>
									<div className="space-y-1 leading-none">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel>
											{t("newsletterPrompt")}
										</FormLabel>
										{/* <FormDescription>
                  You can manage your mobile notifications in the{" "}
                  <Link href="/examples/forms">mobile settings</Link> page.
                </FormDescription> */}
									</div>
								</FormItem>
							)}
						/>
					</div>

					<Button
						className="my-3 w-full"
						onClick={form.handleSubmit(onSubmit)}
					>
						{t("signUpAction")}
					</Button>

					<div className="my-3 w-full">
						<Link to="/login">
							<Button
								className="w-full"
								size={"lg"}
								variant={"link"}
							>
								{t("signInPrompt")}
							</Button>
						</Link>
					</div>

					<Chip className="text-xs" rounded="sm" color="green">
						{t("agreeToTerms")}
					</Chip>
				</form>
			</Form>
		</Loader>
	);
};
