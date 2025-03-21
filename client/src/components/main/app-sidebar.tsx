import {
	BarChartIcon,
	Building2,
	CameraIcon,
	Check,
	ChevronsUpDown,
	ClipboardListIcon,
	DatabaseIcon,
	FileCodeIcon,
	FileIcon,
	FileTextIcon,
	HelpCircleIcon,
	LayoutDashboardIcon,
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
import { useMessages } from "@/hooks/useMessages";
import i18n from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useCompanyStore, type Company } from "@/stores/company-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "../primitives/spinner";
import { Button } from "../ui/button";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { NavSecondary } from "./nav-secondary";

const data = {
	navMain: [
		{
			title: i18n.t("nav:header.links.dashboard"),
			url: "/dashboard",
			icon: LayoutDashboardIcon,
		},
		{
			title: i18n.t("nav:header.links.employees"),
			url: "/employees",
			icon: UsersIcon,
		},
		{
			title: i18n.t("nav:header.links.analytics"),
			url: "/analytics",
			icon: BarChartIcon,
		},
		{
			title: i18n.t("nav:header.links.aboutTheCompany"),
			url: "#",
			icon: Building2,
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
			title: i18n.t("nav:header.links.settings"),
			url: "#",
			icon: SettingsIcon,
		},
		{
			title: i18n.t("nav:header.links.getHelp"),
			url: "#",
			icon: HelpCircleIcon,
		},
		{
			title: i18n.t("nav:header.links.search"),
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

function CompanyCombobox() {
	const { t } = useMessages("nav");

	const [inputValue, setInputValue] = React.useState<string>("");

	const [open, setOpen] = React.useState(false);
	const setSelectedCompany = useCompanyStore(
		(state) => state.setSelectedCompany
	);
	const selectedCompany = useCompanyStore((state) => state.selectedCompany);

	const setCompanies = useCompanyStore((state) => state.setCompanies);
	const companies = useCompanyStore((state) => state.companies);

	const { isLoading, isError } = useQuery({
		queryKey: ["companies"],
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/api/companies`,
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

			const data: Company[] = await response.json();

			setCompanies(data);

			return data;
		},
	});

	const createCompany = useMutation({
		mutationFn: async (companyName: string) => {
			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/company/create`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${
							JSON.parse(
								localStorage.getItem("client-session") || "{}"
							).token
						}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name: companyName }),
				}
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data: Company = await response.json();

			setCompanies([...companies, data]);

			setSelectedCompany(data);
			return data;
		},
	});

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <div>Error</div>;
	}
	const CommandItemCreate = ({
		inputValue,
		companies,
		onSelect,
	}: {
		inputValue: string;
		companies: Company[];
		onSelect: () => void;
	}) => {
		const hasNoCompany = !companies
			.map(({ name }) => name)
			.includes(`${inputValue.toLowerCase()}`);

		const render = inputValue !== "" && hasNoCompany;

		if (!render) return null;

		// BUG: whenever a space is appended, the Create-Button will not be shown.
		return (
			<CommandItem
				key={`${inputValue}`}
				value={`${inputValue}`}
				className="text-xs text-muted-foreground"
				onSelect={onSelect}
			>
				<div className={cn("mr-2 h-4 w-4")} />
				{t("companies.create", {
					companyName: inputValue,
				})}
			</CommandItem>
		);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{selectedCompany
						? selectedCompany.name
						: t("companies.select")}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput
						placeholder={t("companies.search")}
						value={inputValue}
						onValueChange={(value) => setInputValue(value)}
					/>
					<CommandList>
						{companies.filter((company) => {
							company.name
								.toLowerCase()
								.includes(inputValue.toLocaleLowerCase());
						}).length === 0 && (
							<CommandItemCreate
								onSelect={() => {
									createCompany.mutate(inputValue);
									setOpen(false);
									setInputValue("");
								}}
								{...{ inputValue, companies }}
							/>
						)}
						<CommandGroup>
							{companies.map((company) => (
								<CommandItem
									key={company.id}
									value={company.name}
									onSelect={() => {
										setSelectedCompany(company);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											selectedCompany?.id === company.id
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{company.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

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
							{/* <a href="#">
								<ArrowUpCircleIcon className="h-5 w-5" />
								<span className="text-base font-semibold">
									HR-buddy
								</span>
							</a> */}
							<CompanyCombobox />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavDocuments items={data.documents} /> */}
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
