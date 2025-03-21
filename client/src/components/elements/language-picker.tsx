import { useMessages } from "@/hooks/useMessages";
import React, { useEffect, useMemo, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface LanguagePickerProps {}

export const LanguagePicker: React.FC<LanguagePickerProps> = () => {
	const { locales, language, changeLanguage } = useMessages();

	const [dropdownOpened, setDropdownOpened] = useState(false);

	const setLanguage = (l: string) => {
		changeLanguage(l);
		setDropdownOpened(false);
	};

	const displayLanguage = useMemo(
		() =>
			(
				locales.find((l) => l.iso === language) ||
				locales.find((l) => l.code === language)
			)?.code.toUpperCase(),
		[language, locales]
	);

	useEffect(() => {
		// Set the lang attribute on the <html> element
		document.documentElement.lang = language;
		console.log("Language changed to", language);
		console.log("Display language", displayLanguage);
	}, [language]);

	return (
		<div className="block">
			<DropdownMenu
				open={dropdownOpened}
				onOpenChange={setDropdownOpened}
			>
				<DropdownMenuTrigger>{displayLanguage}</DropdownMenuTrigger>
				<DropdownMenuContent>
					{locales.map((l) => (
						<DropdownMenuItem
							key={l.iso}
							onClick={() => setLanguage(l.iso)}
						>
							{l.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
