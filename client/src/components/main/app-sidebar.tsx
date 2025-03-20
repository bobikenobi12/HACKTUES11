import {
	ArrowUpCircleIcon,
	BarChartIcon,
	CameraIcon,
	ClipboardListIcon,
	DatabaseIcon,
	FileCodeIcon,
	FileIcon,
	FileTextIcon,
	FolderIcon,
	HelpCircleIcon,
	LayoutDashboardIcon,
	ListIcon,
	SearchIcon,
	SettingsIcon,
	UsersIcon,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/main/nav-main";
import { NavUser } from "@/components/main/nav-user";
// import { NavDocuments } from "@/components/nav-documents";
// import { NavSecondary } from "@/components/nav-secondary";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "#",
			icon: LayoutDashboardIcon,
		},
		{
			title: "Lifecycle",
			url: "#",
			icon: ListIcon,
		},
		{
			title: "Analytics",
			url: "#",
			icon: BarChartIcon,
		},
		{
			title: "Projects",
			url: "#",
			icon: FolderIcon,
		},
		{
			title: "Team",
			url: "#",
			icon: UsersIcon,
		},
	],
	navClouds: [
		{
			title: "Capture",
			icon: CameraIcon,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: FileTextIcon,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: FileCodeIcon,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: SettingsIcon,
		},
		{
			title: "Get Help",
			url: "#",
			icon: HelpCircleIcon,
		},
		{
			title: "Search",
			url: "#",
			icon: SearchIcon,
		},
	],
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: DatabaseIcon,
		},
		{
			name: "Reports",
			url: "#",
			icon: ClipboardListIcon,
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: FileIcon,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="#">
								<ArrowUpCircleIcon className="h-5 w-5" />
								<span className="text-base font-semibold">
									HR-buddy
								</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavDocuments items={data.documents} /> */}
				{/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
