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
import { useMessages } from "@/hooks/useMessages";
import { ChangePasswordForm } from "../forms/change-password";
import { UserInfoForm } from "../forms/user-info-form";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

export const ProfileDialog = () => {
	const { t } = useMessages("auth");

	const setProfileDialog = useDialogStore((state) => state.setProfileDialog);
	const profileDialog = useDialogStore((state) => state.profileDialog);

	return (
		<Credenza open={profileDialog} onOpenChange={setProfileDialog}>
			<CredenzaContent>
				<CredenzaHeader>
					<CredenzaTitle>{t("profile")}</CredenzaTitle>
					<CredenzaDescription>
						{t("profileDescription")}
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<ScrollArea className="h-[400px]">
						<div className="flex flex-col gap-3 md:flex-row md:gap-8 pr-4">
							<div className="w-1/2">
								<UserInfoForm />
							</div>

							<div className="w-1/2 ">
								<ChangePasswordForm />
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
					</ScrollArea>
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
