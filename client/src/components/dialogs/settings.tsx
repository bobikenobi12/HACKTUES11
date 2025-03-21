import { Button } from "@/components/ui/button";
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
import { useDialogStore } from "@/stores/dialog-store";
import { LanguagePicker } from "../elements/language-picker";
import ThemeToggle from "../elements/theme-toggle";

export const SettingsDialog = () => {
	const { t } = useMessages("nav");

	const settingsDialog = useDialogStore((state) => state.settingsDialog);
	const setSettingsDialog = useDialogStore(
		(state) => state.setSettingsDialog
	);

	return (
		<Credenza open={settingsDialog} onOpenChange={setSettingsDialog}>
			<CredenzaContent>
				<CredenzaHeader>
					<CredenzaTitle>{t("settings.title")}</CredenzaTitle>
					<CredenzaDescription>
						{t("settings.description")}
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<LanguagePicker />
					<ThemeToggle />
				</CredenzaBody>
				<CredenzaFooter>
					<CredenzaClose asChild>
						<Button>{t("settings.close")}</Button>
					</CredenzaClose>
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
};
