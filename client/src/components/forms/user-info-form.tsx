import {
	editProfileSchema,
	useAuth,
	type EditProfileValues,
} from "@/hooks/use-auth";
import { useMessages } from "@/hooks/useMessages";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
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

export interface UserInfoFormProps {
	className?: string;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ className }) => {
	const { t } = useMessages("auth");
	const { user } = useAuth();

	const profile = useAuthStore((state) => state.userProfile);

	const form = useForm<EditProfileValues>({
		resolver: zodResolver(editProfileSchema),
		mode: "onChange",
		defaultValues: {
			name: profile?.name || "",
			email: profile?.email || "",
			phone: profile?.phoneNumber || "",
		},
	});

	const onSubmit = (values: EditProfileValues) => {
		console.log(values);
	};

	const setDefaultUserInfo = () => {
		form.reset({
			name: profile?.name || "",
			email: profile?.email || "",
			phone: profile?.phoneNumber || "",
		});
	};

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-xl">{t("information")}</h2>

			<div className={clsx("flex", className)}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-2">
							<div className="w-full">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fullName.label")}
											</FormLabel>
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
							</div>

							<div className="w-full">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("email.label")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"email.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="w-full">
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("phoneNumber.label")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"phoneNumber.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{user && (
								<div className="p-2.5">
									<Button
										variant={"outline"}
										onClick={setDefaultUserInfo}
									>
										{t("useUserInfo")}
									</Button>
								</div>
							)}

							<div className="mt-6">
								<Button variant={"outline"} type="submit">
									{t("editProfile")}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};
