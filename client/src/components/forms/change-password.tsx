import {
	lowercaseRegex,
	passwordFormSchema,
	type PasswordFormValues,
	specialCharsRegex,
	uppercaseRegex,
} from "@/hooks/use-auth";
import { useMessages } from "@/hooks/useMessages";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export interface ChangePasswordFormProps {}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = () => {
	const { t } = useMessages("auth");
	// const navigate = useNavigate({ from: Route.fullPath });
	// const { changePassword } = useAuth();

	const form = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordFormSchema),
		mode: "onChange",
		defaultValues: {
			oldPassword: "",
			password: "",
		},
	});
	const watchedPassword = form.watch("password");

	const onSubmit = () => {
		// changePassword.mutate(values);
		toast.success("Password changed successfully");
	};

	return (
		<div className="flex flex-col gap-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<h2 className="text-xl">{t("changePassword")}</h2>

					<div className="my-5 flex flex-col gap-3">
						<FormField
							control={form.control}
							name="oldPassword"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center">
										<FormLabel>
											{t("oldPassword.label")}
										</FormLabel>
									</div>
									<FormControl>
										<Input
											type="password"
											placeholder={t(
												"oldPassword.placeholder"
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
									<div className="flex items-center">
										<FormLabel>
											{t("newPassword.label")}
										</FormLabel>
									</div>
									<FormControl>
										<Input
											type="password"
											placeholder={t(
												"newPassword.placeholder"
											)}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="my-2 flex items-center gap-1 leading-none">
						{watchedPassword.length >= 8 ? (
							<CheckCircle2Icon className="size-6 shrink-0" />
						) : (
							<XCircleIcon className="size-6 shrink-0 text-destructive" />
						)}
						{t("passwordRequirements.minLength")}
					</div>

					<div className="my-2 flex items-center gap-1 leading-none">
						{watchedPassword.match(specialCharsRegex) ? (
							<CheckCircle2Icon className="size-6 shrink-0" />
						) : (
							<XCircleIcon className="size-6 shrink-0 text-destructive" />
						)}
						{t("passwordRequirements.specialChar")}
					</div>

					<div className="my-2 flex items-center gap-1 leading-none">
						{watchedPassword.match(lowercaseRegex) ? (
							<CheckCircle2Icon className="size-6 shrink-0" />
						) : (
							<XCircleIcon className="size-6 shrink-0 text-destructive" />
						)}
						{t("passwordRequirements.lowercase")}
					</div>

					<div className="my-2 flex items-center gap-1 leading-none">
						{watchedPassword.match(uppercaseRegex) ? (
							<CheckCircle2Icon className="size-6 shrink-0" />
						) : (
							<XCircleIcon className="size-6 shrink-0 text-destructive" />
						)}
						{t("passwordRequirements.uppercase")}
					</div>

					<Button
						className="mt-5"
						variant="outline"
						onClick={form.handleSubmit(onSubmit)}
					>
						{t("changePassword")}
					</Button>
				</form>
			</Form>
		</div>
	);
};
