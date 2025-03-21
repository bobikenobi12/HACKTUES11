import { useAuth, type EditProfileValues } from "@/hooks/use-auth";
import { useMessages } from "@/hooks/useMessages";
import clsx from "clsx";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export interface UserInfoFormProps {
	form: UseFormReturn<EditProfileValues>;
	className?: string;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({
	form,
	className,
}) => {
	const { t } = useMessages("auth");
	const { user } = useAuth();

	const setDefaultUserInfo = () => {
		if (!user) return;

		form.setValue("name", user.name!);
		form.setValue("email", user.email!);
		form.setValue("phone", user.phone || "");
	};

	return (
		<div className={clsx("-m-2.5 flex flex-wrap", className)}>
			<div className="w-full shrink-0 p-2.5">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("fullName.label")}</FormLabel>
							<FormControl>
								<Input
									placeholder={t("fullName.placeholder")}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="w-full shrink-0 p-2.5 md:w-1/2">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("email.label")}</FormLabel>
							<FormControl>
								// @ts-ignore
								<Input
									placeholder={t("email.placeholder")}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="w-full shrink-0 p-2.5 md:w-1/2">
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("phoneNumber.label")}</FormLabel>
							<FormControl>
								<Input
									placeholder={t("phoneNumber.placeholder")}
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
					<Button variant={"outline"} onClick={setDefaultUserInfo}>
						{t("useUserInfo")}
					</Button>
				</div>
			)}
		</div>
	);
};
