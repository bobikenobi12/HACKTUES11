import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useMessages } from "@/hooks/useMessages";
import { NewEmployeeForm } from "../forms/new-employee";
import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger,
} from "../ui/credenza";

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

	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					<SidebarMenuItem className="flex items-center gap-2">
						<Credenza>
							<CredenzaTrigger asChild>
								<SidebarMenuButton
									tooltip={t("navAction")}
									className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
								>
									<PlusCircleIcon />
									<span>{t("navAction")}</span>
								</SidebarMenuButton>
							</CredenzaTrigger>
							<CredenzaContent>
								<CredenzaHeader>
									<CredenzaTitle>
										New Potential Employee{" "}
									</CredenzaTitle>
									<CredenzaDescription>
										Add a new potential employee to the
										system.
									</CredenzaDescription>
								</CredenzaHeader>
								<CredenzaBody>
									<NewEmployeeForm />
								</CredenzaBody>
								<CredenzaFooter>
									<CredenzaClose asChild>
										<Button>
											<span>{t("close")}</span>
										</Button>
									</CredenzaClose>
								</CredenzaFooter>
							</CredenzaContent>
						</Credenza>

						<Button
							size="icon"
							className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
							variant="outline"
						>
							<MailIcon />
							<span className="sr-only">See All</span>
						</Button>
					</SidebarMenuItem>
				</SidebarMenu>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton tooltip={item.title}>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
