import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Company } from "@/stores/company-store";
import {
	BriefcaseBusiness,
	MessageSquareQuote,
	Pickaxe,
	TrendingUpIcon,
	Undo2,
	Users,
} from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "../ui/chart";
import { Separator } from "../ui/separator";

import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const companies: Company = {
	id: "1",
	name: "Company Name",
	employees: [
		{
			id: "1",
			name: "John Doe",
			birth_date: "1990-01-01",
			risk_of_bribery: 25,
			employee_efficiency: 85,
			career_growth_potential: 90,
			employee_reputation: 80,
			risk_of_employee_turnover: 20,
		},
		{
			id: "2",
			name: "Jane Smith",
			birth_date: "1985-05-15",
			risk_of_bribery: 30,
			employee_efficiency: 75,
			career_growth_potential: 85,
			employee_reputation: 70,
			risk_of_employee_turnover: 25,
		},
		{
			id: "3",
			name: "Alice Johnson",
			birth_date: "1992-07-20",
			risk_of_bribery: 20,
			employee_efficiency: 90,
			career_growth_potential: 95,
			employee_reputation: 85,
			risk_of_employee_turnover: 15,
		},
		{
			id: "4",
			name: "Bob Brown",
			birth_date: "1988-03-10",
			risk_of_bribery: 40,
			employee_efficiency: 65,
			career_growth_potential: 70,
			employee_reputation: 60,
			risk_of_employee_turnover: 35,
		},
		{
			id: "5",
			name: "Charlie Davis",
			birth_date: "1995-11-25",
			risk_of_bribery: 15,
			employee_efficiency: 80,
			career_growth_potential: 88,
			employee_reputation: 75,
			risk_of_employee_turnover: 18,
		},
		{
			id: "6",
			name: "Diana Evans",
			birth_date: "1983-02-05",
			risk_of_bribery: 35,
			employee_efficiency: 70,
			career_growth_potential: 80,
			employee_reputation: 65,
			risk_of_employee_turnover: 30,
		},
		{
			id: "7",
			name: "Ethan Foster",
			birth_date: "1991-09-12",
			risk_of_bribery: 25,
			employee_efficiency: 85,
			career_growth_potential: 90,
			employee_reputation: 80,
			risk_of_employee_turnover: 20,
		},
		{
			id: "8",
			name: "Fiona Green",
			birth_date: "1987-06-30",
			risk_of_bribery: 28,
			employee_efficiency: 78,
			career_growth_potential: 82,
			employee_reputation: 72,
			risk_of_employee_turnover: 22,
		},
	],
};

const radarChartConfig = {
	average: {
		label: "Average metrics for all employees",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function SectionCards() {
	const generatePDF = async () => {
		const input = document.getElementById("pdf-content");
		if (!input) return;

		const pdf = new jsPDF("p", "mm", "a4");
		const pageHeight = pdf.internal.pageSize.height;
		const pageWidth = pdf.internal.pageSize.width;
		let yOffset = 10;

		const elements = input.children;

		for (let i = 0; i < elements.length; i++) {
			const element = elements[i] as HTMLElement;
			const canvas = await html2canvas(element, { useCORS: true });
			const imgData = canvas.toDataURL("image/png");
			const imgWidth = pageWidth - 20;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;

			if (yOffset + imgHeight > pageHeight - 10) {
				pdf.addPage();
				yOffset = 10;
			}

			pdf.addImage(imgData, "PNG", 10, yOffset, imgWidth, imgHeight);
			yOffset += imgHeight + 10;
		}

		pdf.save("employee_report.pdf");
	};

	const totalEmployees = companies.employees.length;
	const avgRiskOfBribery = (
		companies.employees.reduce((sum, emp) => sum + emp.risk_of_bribery, 0) /
		totalEmployees
	).toFixed(2);
	const avgEfficiencyScore = (
		companies.employees.reduce(
			(sum, emp) => sum + emp.employee_efficiency,
			0
		) / totalEmployees
	).toFixed(2);
	const avgTurnoverRisk = (
		companies.employees.reduce(
			(sum, emp) => sum + emp.risk_of_employee_turnover,
			0
		) / totalEmployees
	).toFixed(2);
	const avgReputationScore = (
		companies.employees.reduce(
			(sum, emp) => sum + emp.employee_reputation,
			0
		) / totalEmployees
	).toFixed(2);
	const avgCareerGrowthPotential = (
		companies.employees.reduce(
			(sum, emp) => sum + emp.career_growth_potential,
			0
		) / totalEmployees
	).toFixed(2);

	return (
		<div className="flex flex-col gap-4">
			<Button onClick={generatePDF} className="self-end mx-4 my-2">
				Generate PDF
			</Button>

			<div id="pdf-content">
				<Card className="mx-4 my-2">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							1. Company Overview
						</CardTitle>
					</CardHeader>
					<CardFooter className="flex items-start flex-col gap-2 text-sm">
						<div className="flex gap-2 font-medium">
							<Users /> Total Employees: {totalEmployees}
						</div>
						<div className="flex gap-2 font-medium">
							<BriefcaseBusiness /> Average Risk of Bribery:{" "}
							{avgRiskOfBribery}%
						</div>
						<div className="flex gap-2 font-medium">
							<Pickaxe /> Average Efficiency Score:{" "}
							{avgEfficiencyScore}%
						</div>
						<div className="flex gap-2 font-medium">
							<Undo2 /> Average Turnover Risk: {avgTurnoverRisk}%
						</div>
						<div className="flex gap-2 font-medium">
							<MessageSquareQuote /> Average Reputation Score:{" "}
							{avgReputationScore}%
						</div>
						<div className="flex gap-2 font-medium">
							<TrendingUpIcon /> Average Career Growth Potential:{" "}
							{avgCareerGrowthPotential}%
						</div>
					</CardFooter>
				</Card>

				<Separator className="border-dashed my-6 px-4" />

				{/* Cards for each employee, but i need to add a header above them */}
				<Card className="mx-4 my-2">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							2. Employee Details
						</CardTitle>
					</CardHeader>
				</Card>
				<div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
					{/* header 1 for first cards, afterwards startinw with charts */}

					{companies.employees.map((employee) => (
						<Card key={employee.id} className="@container/card">
							<CardHeader className="relative">
								<CardDescription>
									{employee.name}
								</CardDescription>
								<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
									Efficiency: {employee.employee_efficiency}%
								</CardTitle>
								<div className="absolute right-4 top-4">
									<Badge
										variant="outline"
										className="flex gap-1 rounded-lg text-xs"
									>
										<TrendingUpIcon className="size-3" />
										Reputation:{" "}
										{employee.employee_reputation}%
									</Badge>
								</div>
							</CardHeader>
							<CardFooter className="flex-col items-start gap-1 text-sm">
								<div className="line-clamp-1 flex gap-2 font-medium">
									Career Growth Potential:{" "}
									{employee.career_growth_potential}%
								</div>
								<div className="text-muted-foreground">
									Risk of Bribery: {employee.risk_of_bribery}%
								</div>
								<div className="text-muted-foreground">
									Risk of Turnover:{" "}
									{employee.risk_of_employee_turnover}%
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
				<Separator className="border-dashed my-6 px-4" />

				{/* <Card className="mx-4 my-2">
				<CardHeader>
					<CardTitle className="text-2xl font-semibold">
						3. Employee Count by Category
					</CardTitle>
				</CardHeader>
				<CardFooter className="flex items-start flex-col gap-2 text-sm">
					<PieChart width={400} height={400}>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={80}
							fill="#8884d8"
							dataKey="value"
						>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.value > 80 ? "#00C49F" : "#FF8042"}
								/>
							))}
						</Pie>
					</PieChart>
				</CardFooter>
			</Card>

			<Separator className="border-dashed my-6 px-4" /> */}

				<Card className="mx-4 my-2">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							4. Employee Avatars
						</CardTitle>
					</CardHeader>
					<CardFooter className="flex items-start flex-col gap-2 text-sm">
						{/* Avatar List Component */}
						<div className="grid grid-cols-4 gap-4">
							{companies.employees.map((employee) => (
								<div
									key={employee.id}
									className="flex flex-col items-center"
								>
									<Avatar>
										<AvatarFallback>
											{employee.name[0] +
												employee.name[1]}
										</AvatarFallback>
									</Avatar>
									<span className="text-xs mt-2">
										{employee.name}
									</span>
								</div>
							))}
						</div>
					</CardFooter>
				</Card>

				<Separator className="border-dashed my-6 px-4" />

				{/* show all 5 averages on a radar chart */}
				<Card className="mx-4 my-2">
					<CardHeader className="items-center">
						<CardTitle>5. Average Metrics</CardTitle>
						<CardDescription>
							Showing average metrics for all employees in a radar
							chart
						</CardDescription>
					</CardHeader>
					<CardContent className="pb-0">
						<ChartContainer
							config={radarChartConfig}
							className="mx-auto aspect-square max-h-[350px]"
						>
							<RadarChart
								data={[
									{
										metric: "Risk of Bribery",
										average: avgRiskOfBribery,
									},
									{
										metric: "Efficiency",
										average: avgEfficiencyScore,
									},
									{
										metric: "Turnover Risk",
										average: avgTurnoverRisk,
									},
									{
										metric: "Reputation",
										average: avgReputationScore,
									},
									{
										metric: "Career Growth",
										average: avgCareerGrowthPotential,
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
									dataKey="average"
									fill="var(--color-desktop)"
									fillOpacity={0.6}
									dot={{
										r: 4,
										fillOpacity: 1,
									}}
								/>
							</RadarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
