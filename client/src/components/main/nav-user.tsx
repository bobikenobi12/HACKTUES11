import {
	BellIcon,
	CreditCardIcon,
	LogOutIcon,
	MoreVerticalIcon,
	UserCircleIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useMessages } from "@/hooks/useMessages";
import { useAuthStore } from "@/stores/auth-store";
import { useDialogStore } from "@/stores/dialog-store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

export function NavUser() {
	const { isMobile } = useSidebar();
	const { t } = useMessages("nav");

	// profile dialog states
	const setProfileDialog = useDialogStore((state) => state.setProfileDialog);

	const setSession = useAuthStore((state) => state.setSession);
	const navigate = useNavigate();

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/api/profile`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${
							JSON.parse(
								localStorage.getItem("client-session") || "{}"
							).token
						}`,
						"Content-Type": "application/json",
					},
				}
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			return data as Promise<{
				name: string;
				email: string;
				avatar: string;
				role: string;
				phoneNumber: string;
				countryCode: string;
				local: string;
				username: string;
				message: string;
			}>;
		},
	});

	if (isLoading) {
		<div className="flex items-center justify-center h-16">
			<Skeleton className="h-8 w-8 rounded-lg" />
			<div className="flex flex-col ml-2">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-3 w-16" />
			</div>
		</div>;
	}

	if (isError) {
		toast.error("An error occurred", {
			description: error.message,
		});
	}

	if (!data)
		return (
			<div className="flex items-center justify-center h-16">No User</div>
		);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg grayscale">
								<AvatarImage alt={data.name} />
								<AvatarFallback className="rounded-lg">
									{data.name[0] + data.name[1]}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{data.name}
								</span>
								<span className="truncate text-xs text-muted-foreground">
									{data.email}
								</span>
							</div>
							<MoreVerticalIcon className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage alt={data.name} />
									<AvatarFallback className="rounded-lg">
										{data.name[0] + data.name[1]}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{data.name}
									</span>
									<span className="truncate text-xs text-muted-foreground">
										{data.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								onClick={() => setProfileDialog(true)}
							>
								<UserCircleIcon />
								{t("profile")}
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCardIcon />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<BellIcon />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								setSession(null);
								navigate({
									to: "/login",
								});
								toast.success("You have been logged out");
							}}
						>
							<LogOutIcon />
							{t("logout")}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
