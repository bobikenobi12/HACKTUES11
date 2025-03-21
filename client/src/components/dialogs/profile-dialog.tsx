import { useDialogStore } from "@/stores/dialog-store";

import { CredenzaDescription } from "@/components/ui/credenza";
import { useMessages } from "@/hooks/useMessages";
import { ChangePasswordForm } from "../forms/change-password";
import { UserInfoForm } from "../forms/user-info-form";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "../ui/sheet";

export const ProfileDialog = () => {
	const { t } = useMessages("auth");

	const setProfileDialog = useDialogStore((state) => state.setProfileDialog);
	const profileDialog = useDialogStore((state) => state.profileDialog);

	return (
		<Sheet open={profileDialog} onOpenChange={setProfileDialog}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{t("profile")}</SheetTitle>
					<CredenzaDescription>
						{t("profileDescription")}
					</CredenzaDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4 px-4 overflow-y-scroll overflow-x-clip">
					<div className="flex flex-col gap-3 pr-4">
						<div className="w-1/2">
							<UserInfoForm />
						</div>
						<Separator className="my-8" />
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
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button>{t("closeProfileModule")}</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
