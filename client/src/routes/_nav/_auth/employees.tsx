import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { MoreHorizontal, Trash2 } from "lucide-react";

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	useCompanyStore,
	type AddEmployee,
	type Employee,
} from "@/stores/company-store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/_nav/_auth/employees")({
	component: EmployeesPage,
});

import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<AddEmployee>[] = [
	{
		accessorKey: "name",
		header: "Name",
		enableSorting: true,
	},
	{
		accessorKey: "birth_date",
		header: "Birth Date",
	},
	{
		accessorKey: "risk_of_bribery",
		header: "Bribery Risk",
	},
	{
		accessorKey: "employee_efficiency",
		header: "Efficiency",
	},
	{
		accessorKey: "risk_of_employee_turnover",
		header: "Turnover Risk",
	},
	{
		accessorKey: "employee_reputation",
		header: "Reputation",
	},
	{
		accessorKey: "career_growth_potential",
		header: "Growth Potential",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const employee = row.original;

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
							Copy employee name
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View employee</DropdownMenuItem>
						<DropdownMenuItem>
							<Trash2 />
							Remove employee
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
	const selectedCompany = useCompanyStore((state) => state.selectedCompany);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
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
								data-state={row.getIsSelected() && "selected"}
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
									? "No employees found"
									: "No company selected"}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

function EmployeesPage() {
	const selectedCompany = useCompanyStore((state) => state.selectedCompany);
	const addEmployeeToCompany = useCompanyStore(
		(state) => state.addEmployeeToCompany
	);

	const [filters, setFilters] = useState({
		name: "",
		minEfficiency: 0,
		maxEfficiency: 100,
	});

	const addEmployee = useMutation({
		mutationFn: async (employee: AddEmployee) => {
			if (!selectedCompany) {
				throw new Error("No company selected");
			}
			const res = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/company/${selectedCompany.id}/employee`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${
							JSON.parse(
								localStorage.getItem("client-session") || "{}"
							).token
						}`,
					},
					body: JSON.stringify(employee),
				}
			);
			if (!res.ok) {
				throw new Error("Failed to add employee");
			}

			const data: Employee = await res.json();

			addEmployeeToCompany(data);
			return res.json();
		},
	});

	// const filteredEmployees =
	// 	selectedCompany &&
	// 	selectedCompany.employees.filter(
	// 		(emp) =>
	// 			emp.name.toLowerCase().includes(filters.name.toLowerCase()) &&
	// 			emp.employee_efficiency >= filters.minEfficiency &&
	// 			emp.employee_efficiency <= filters.maxEfficiency
	// 	);

	return (
		<div className="p-6 space-y-4">
			<Card>
				<CardContent className="p-4 space-y-3">
					<Input
						placeholder="Search by name"
						value={filters.name}
						onChange={(e) =>
							setFilters({ ...filters, name: e.target.value })
						}
					/>
					<div className="flex items-center gap-4">
						<span>Efficiency:</span>
						<Slider
							min={0}
							max={100}
							value={[
								filters.minEfficiency,
								filters.maxEfficiency,
							]}
							onValueChange={(value) =>
								setFilters({
									...filters,
									minEfficiency: value[0],
									maxEfficiency: value[1],
								})
							}
						/>
					</div>
				</CardContent>
			</Card>
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
