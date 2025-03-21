import { createFileRoute } from "@tanstack/react-router";

import { Input } from "@/components/ui/input";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react";

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
} from "@tanstack/react-table";

import { useCompanyStore, type Employee } from "@/stores/company-store";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export const Route = createFileRoute("/_nav/_auth/employees")({
	component: EmployeesPage,
});

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { useMessages } from "@/hooks/useMessages";
import i18n from "@/lib/i18n";
import { useDialogStore } from "@/stores/dialog-store";
import type { ColumnDef } from "@tanstack/react-table";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Employee>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			const { t } = useMessages("auth");
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					{t("employeeName")}
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "birth_date",
		header: i18n.t("auth:birthDate.label"),
	},
	{
		accessorKey: "risk_of_bribery",
		header: i18n.t("charts:metrics.risk_of_bribery"),
	},
	{
		accessorKey: "employee_efficiency",
		header: i18n.t("charts:metrics.employee_efficiency"),
	},
	{
		accessorKey: "risk_of_employee_turnover",
		header: i18n.t("charts:metrics.risk_of_employee_turnover"),
	},
	{
		accessorKey: "employee_reputation",
		header: i18n.t("charts:metrics.employee_reputation"),
	},
	{
		accessorKey: "career_growth_potential",
		header: i18n.t("charts:metrics.career_growth_potential"),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const employee = row.original;

			const { t } = useMessages("nav");

			const setViewEmployeeSheet = useDialogStore(
				(state) => state.setViewEmployeeSheet
			);

			const removeEmployeeFromCompany = useCompanyStore(
				(state) => state.removeEmployeeFromCompany
			);
			const selectedCompany = useCompanyStore(
				(state) => state.selectedCompany
			);

			const removeEmployee = useMutation({
				mutationFn: async (employee: Employee) => {
					if (!selectedCompany) {
						toast.error(t("removeEmployee.uknownCompany"));
						throw new Error(t("removeEmployee.uknownCompany"));
					}

					const response = await fetch(
						`${import.meta.env.VITE_SERVER_URL}/company/${selectedCompany.id}/employee/${employee.id}`,
						{
							method: "DELETE",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${JSON.parse(localStorage.getItem("client-session") || "{}").token}`,
							},
						}
					);

					if (!response.ok) {
						toast.error(
							t("removeEmployee.error", {
								employeeName: employee.name,
								companyName: selectedCompany.name,
							})
						);
						throw new Error(
							t("removeEmployee.error", {
								employeeName: employee.name,
								companyName: selectedCompany.name,
							})
						);
					}

					toast.success(
						t("removeEmployee.success", {
							employeeName: employee.name,
							companyName: selectedCompany.name,
						})
					);

					const data = await response.json();

					removeEmployeeFromCompany(employee);
					return data;
				},
			});

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"ghost"} className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(employee.name)
							}
						>
							{t("employeeActions.copyName")}
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								setViewEmployeeSheet(true);
							}}
						>
							{t("employeeActions.view")}
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								removeEmployee.mutate(employee);
							}}
						>
							<Trash2 />
							{t("employeeActions.remove")}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const { t } = useMessages("auth");
	const selectedCompany = useCompanyStore((state) => state.selectedCompany);

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);

	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	return (
		<div>
			<div className="flex items-center py-4">
				<Input
					placeholder={t("filterNamesAction")}
					value={
						(table.getColumn("name")?.getFilterValue() as string) ??
						""
					}
					onChange={(event) =>
						table
							.getColumn("name")
							?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							{t("columns")}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter(
								(column) =>
									column.getCanHide() &&
									typeof column.columnDef.header !==
										"function"
							)
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{typeof column.columnDef.header !==
											"function" &&
											column.columnDef.header}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									{selectedCompany
										? t("employee.noEmployeesFound")
										: t("noCompanySelected")}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{t("previous")}
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{t("next")}
				</Button>
			</div>
		</div>
	);
}

const radarChartConfig = {
	points: {
		label: i18n.t("charts:metrics.singleEmployee"),
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

function EmployeesPage() {
	const { t } = useMessages("charts");
	const selectedCompany = useCompanyStore((state) => state.selectedCompany);

	const viewEmployeeSheet = useDialogStore(
		(state) => state.viewEmployeeSheet
	);
	const setViewEmployeeSheet = useDialogStore(
		(state) => state.setViewEmployeeSheet
	);

	return (
		<div className="p-6 space-y-4">
			<Sheet open={viewEmployeeSheet} onOpenChange={setViewEmployeeSheet}>
				<SheetContent className="min-w-[800px]">
					<SheetHeader>
						<SheetTitle>{t("employeeMetrics.title")}</SheetTitle>
						<SheetDescription>
							{t("employeeMetrics.description")}
						</SheetDescription>
					</SheetHeader>
					<div className="pb-0">
						<ChartContainer
							config={radarChartConfig}
							className="mx-auto max-h-[450px] w-full"
						>
							<RadarChart
								data={[
									{
										metric: t("metrics.risk_of_bribery"),
										points: Math.random() * 100,
									},
									{
										metric: t(
											"metrics.employee_efficiency"
										),
										points: Math.random() * 100,
									},
									{
										metric: t(
											"metrics.risk_of_employee_turnover"
										),
										points: Math.random() * 100,
									},
									{
										metric: t(
											"metrics.employee_reputation"
										),
										points: Math.random() * 100,
									},
									{
										metric: t(
											"metrics.career_growth_potential"
										),
										points: Math.random() * 100,
									},
								]}
							>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent />}
								/>
								<PolarAngleAxis dataKey="metric" />
								<PolarGrid />
								<Radar
									dataKey="points"
									fill="var(--color-desktop)"
									fillOpacity={0.6}
									dot={{
										r: 4,
										fillOpacity: 1,
									}}
								/>
							</RadarChart>
						</ChartContainer>
					</div>
				</SheetContent>
			</Sheet>
			<DataTable
				columns={columns}
				data={selectedCompany?.employees || []}
			/>
			{/* <Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Birth Date</TableHead>
						<TableHead>Bribery Risk</TableHead>
						<TableHead>Efficiency</TableHead>
						<TableHead>Turnover Risk</TableHead>
						<TableHead>Reputation</TableHead>
						<TableHead>Growth Potential</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredEmployees ? (
						filteredEmployees.map((emp) => (
							<TableRow key={emp.id}>
								<TableCell>{emp.name}</TableCell>
								<TableCell>{emp.birth_date}</TableCell>
								<TableCell>{emp.risk_of_bribery}</TableCell>
								<TableCell>{emp.employee_efficiency}</TableCell>
								<TableCell>
									{emp.risk_of_employee_turnover}
								</TableCell>
								<TableCell>{emp.employee_reputation}</TableCell>
								<TableCell>
									{emp.career_growth_potential}
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={7}>
								No employees found
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table> */}
		</div>
	);
}
