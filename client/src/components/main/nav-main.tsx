import { PlusCircleIcon, type LucideIcon } from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useMessages } from "@/hooks/useMessages";
import { useDialogStore } from "@/stores/dialog-store";
import { Link as RouterLink } from "@tanstack/react-router";
import { LanguagePicker } from "../elements/language-picker";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
	}[];
}) {
	const { t } = useMessages("nav");

	const setGatherAnalyticsDialog = useDialogStore(
		(state) => state.setGatherAnalyticsDialog
	);

	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							tooltip={t("navAction")}
							className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
							onClick={() => setGatherAnalyticsDialog(true)}
						>
							<PlusCircleIcon />
							<span>{t("navAction")}</span>
						</SidebarMenuButton>

						<div className="flex items-center gap-2 shrink-0 group-data-[collapsible=icon]:opacity-0">
							<LanguagePicker />
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
				<SidebarMenu>
					{items.map((item, index) => (
						<RouterLink to={item.url} key={index}>
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</RouterLink>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
