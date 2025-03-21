import { useDialogStore } from "@/stores/dialog-store";

import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
} from "@/components/ui/credenza";
import type { EditProfileValues } from "@/hooks/use-auth";
import { editProfileSchema } from "@/hooks/use-auth";
import { useMessages } from "@/hooks/useMessages";
import { useAuthStore, type UserProfile } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserInfoForm } from "../forms/user-info-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

export const ProfileDialog = () => {
	const { t } = useMessages("auth");

	const setProfileDialog = useDialogStore((state) => state.setProfileDialog);
	const profileDialog = useDialogStore((state) => state.profileDialog);

	const profile = useAuthStore((state) => state.userProfile);

	const form = useForm<EditProfileValues>({
		resolver: zodResolver(editProfileSchema),
		mode: "onChange",
		defaultValues: {
			name: profile?.name || "",
			email: profile?.email || "",
			phone: profile?.phone || "",
		},
	});
	const onEditProfile = (values: Partial<UserProfile>) => {
		// editProfile.mutate(values);
	};
	return (
		<Credenza open={profileDialog} onOpenChange={setProfileDialog}>
			<CredenzaContent>
				<CredenzaHeader>
					<CredenzaTitle>{t("profile")}</CredenzaTitle>
					<CredenzaDescription>
						{t("profileDescription")}
					</CredenzaDescription>
					``
				</CredenzaHeader>
				<CredenzaBody>
					<div className="flex flex-col gap-3 md:flex-row md:gap-0">
						<div className="flex-1">
							<div className="flex h-full flex-col justify-between">
								<div>
									<h2 className="mb-8 text-3xl">
										{t("information")}
									</h2>
									<Form {...form}>
										<UserInfoForm form={form} />
									</Form>
								</div>

								<div className="mt-6">
									<Button
										variant={"outline"}
										onClick={() =>
											form.handleSubmit(onEditProfile)
										}
									>
										{t("editProfile")}
									</Button>
								</div>
							</div>
						</div>

						<div className="shrink-0 md:w-1/3 md:pl-10">
							<div>{/* <ChangePasswordForm /> */}</div>
						</div>
					</div>

					<div className="mt-10">
						<h2 className="mb-8 text-3xl">{t("dangerZone")}</h2>

						<Button
							variant={"outline"}
							className="text-destructive"
							// onClick={deleteUser.mutate}
						>
							{t("deleteAccount")}
						</Button>
					</div>
				</CredenzaBody>
				<CredenzaFooter>
					<CredenzaClose asChild>
						<Button>{t("closeProfileModule")}</Button>
					</CredenzaClose>
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
};
