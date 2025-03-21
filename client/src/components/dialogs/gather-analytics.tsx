import { useMessages } from "@/hooks/useMessages";
import { useDialogStore } from "@/stores/dialog-store";
import { NewEmployeeForm } from "../forms/new-employee";
import { Button } from "../ui/button";
import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
} from "../ui/credenza";

export const GatherAnalyticsDialog = () => {
	const { t } = useMessages("nav");

	const gatherAnalyticsDialog = useDialogStore(
		(state) => state.gatherAnalyticsDialog
	);
	const setGatherAnalyticsDialog = useDialogStore(
		(state) => state.setGatherAnalyticsDialog
	);

	return (
		<Credenza
			open={gatherAnalyticsDialog}
			onOpenChange={setGatherAnalyticsDialog}
		>
			<CredenzaContent>
				<CredenzaHeader>
					<CredenzaTitle>
						{t("gatherAnalytics.dialogTitle")}
					</CredenzaTitle>
					<CredenzaDescription>
						{t("gatherAnalytics.dialogContent")}
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<NewEmployeeForm />
				</CredenzaBody>
				<CredenzaFooter>
					<CredenzaClose asChild>
						<Button variant="ghost">
							<span>{t("close")}</span>
						</Button>
					</CredenzaClose>
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
};
