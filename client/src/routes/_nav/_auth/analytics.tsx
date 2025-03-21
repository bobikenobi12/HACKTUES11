import { createFileRoute } from "@tanstack/react-router";

import { SectionCards } from "@/components/main/section-cards";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useMessages } from "@/hooks/useMessages";
import i18n from "@/lib/i18n";
import { useCompanyStore } from "@/stores/company-store";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import {
	BriefcaseBusiness,
	MessageSquareQuote,
	Pickaxe,
	TrendingUpIcon,
	Undo2,
	Users,
} from "lucide-react";
import React from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	XAxis,
	YAxis,
} from "recharts";

export const Route = createFileRoute("/_nav/_auth/analytics")({
	component: AnalyticsPage,
});

export interface EmployeeAnalysis {
	metrics: {
		risk_of_bribery: number;
		employee_efficiency: number;
		risk_of_employee_turnover: number;
		employee_reputation: number;
		career_growth_potential: number;
	};
	analysis: {
		risk_of_bribery: string;
		employee_efficiency: string;
		risk_of_employee_turnover: string;
		employee_reputation: string;
		career_growth_potential: string;
	};
}

const chartConfig = {
	risk_of_employee_turnover: {
		label: i18n.t("charts:metrics.risk_of_employee_turnover"),
		color: "hsl(var(--chart-1))",
	},
	employee_reputation: {
		label: i18n.t("charts:metrics.employee_reputation"),
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

const radarChartConfig = {
	average: {
		label: i18n.t("charts:metrics.average"),
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

function AnalyticsPage() {
	const [timeRange, setTimeRange] = React.useState("all");

	const { t } = useMessages("charts");

	const selectedCompany = useCompanyStore((state) => state.selectedCompany);

	if (!selectedCompany) {
		return (
			<Card className="mx-4 my-2">
				<CardHeader>
					<CardTitle className="text-2xl font-semibold">
						{t("noCompanySelected")}
					</CardTitle>
				</CardHeader>
			</Card>
		);
	}

	if (!selectedCompany.employees || selectedCompany.employees.length === 0) {
		return (
			<Card className="mx-4 my-2">
				<CardHeader>
					<CardTitle className="text-2xl font-semibold">
						{t("noEmployees")}
					</CardTitle>
				</CardHeader>
			</Card>
		);
	}

	const totalEmployees = selectedCompany.employees
		? selectedCompany.employees.length
		: 0;
	const avgRiskOfBribery = (
		selectedCompany.employees.reduce(
			(sum, emp) => sum + emp.risk_of_bribery,
			0
		) / totalEmployees
	).toFixed(2);
	const avgEfficiencyScore = (
		selectedCompany.employees.reduce(
			(sum, emp) => sum + emp.employee_efficiency,
			0
		) / totalEmployees
	).toFixed(2);
	const avgTurnoverRisk = (
		selectedCompany.employees.reduce(
			(sum, emp) => sum + emp.risk_of_employee_turnover,
			0
		) / totalEmployees
	).toFixed(2);
	const avgReputationScore = (
		selectedCompany.employees.reduce(
			(sum, emp) => sum + emp.employee_reputation,
			0
		) / totalEmployees
	).toFixed(2);
	const avgCareerGrowthPotential = (
		selectedCompany.employees.reduce(
			(sum, emp) => sum + emp.career_growth_potential,
			0
		) / totalEmployees
	).toFixed(2);

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

	return (
		<div className="flex flex-col gap-4">
			<Button onClick={generatePDF} className="self-end mx-4 my-2">
				{t("downloadPDF")}
			</Button>

			<div id="pdf-content">
				<Card className="mx-4 my-2">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							1. {t("steps.companyOverview")}
						</CardTitle>
					</CardHeader>
					<CardFooter className="flex items-start flex-col gap-2 text-sm">
						<div className="flex gap-2 font-medium">
							<Users />{" "}
							{t("overview.totalEmployees", {
								count: totalEmployees,
							})}
						</div>
						<div className="flex gap-2 font-medium">
							<BriefcaseBusiness />{" "}
							{t("overview.averageRiskOfBribery", {
								points: avgRiskOfBribery,
							})}
						</div>
						<div className="flex gap-2 font-medium">
							<Pickaxe />{" "}
							{t("overview.averageEmployeeEfficiency", {
								points: avgEfficiencyScore,
							})}
						</div>
						<div className="flex gap-2 font-medium">
							<Undo2 />{" "}
							{t("overview.averageRiskOfEmployeeTurnover", {
								points: avgTurnoverRisk,
							})}
						</div>
						<div className="flex gap-2 font-medium">
							<MessageSquareQuote />{" "}
							{t("overview.averageEmployeeReputation", {
								points: avgReputationScore,
							})}
						</div>
						<div className="flex gap-2 font-medium">
							<TrendingUpIcon />{" "}
							{t("overview.averageCareerGrowthPotential", {
								points: avgCareerGrowthPotential,
							})}
						</div>
					</CardFooter>
				</Card>

				<Separator className="border-dashed my-6 px-4" />

				<SectionCards />

				<Separator className="border-dashed my-6 px-4" />

				<Card className="mx-4 my-2">
					<CardHeader>
						<CardTitle className="text-xl font-semibold">
							3. Employee Avatars
						</CardTitle>
					</CardHeader>
					<CardFooter className="flex items-start flex-col gap-2 text-sm">
						{/* Avatar List Component */}
						<div className="grid grid-cols-4 gap-4">
							{selectedCompany.employees.map((employee) => (
								<div
									key={employee.id}
									className="flex flex-col items-center"
								>
									<Avatar>
										<AvatarFallback>
											{employee.name[0] +
												employee.name[1].toUpperCase()}
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
						<CardTitle className="text-xl font-semibold">
							4. {t("steps.averageMetrics.title")}
						</CardTitle>
						<CardDescription>
							{t("steps.averageMetrics.description")}
						</CardDescription>
					</CardHeader>
					<CardContent className="pb-0">
						<ChartContainer
							config={radarChartConfig}
							className="mx-auto max-h-[450px]"
						>
							<RadarChart
								data={[
									{
										metric: t("metrics.risk_of_bribery"),
										average: avgRiskOfBribery,
									},
									{
										metric: t(
											"metrics.employee_efficiency"
										),
										average: avgEfficiencyScore,
									},
									{
										metric: t(
											"metrics.risk_of_employee_turnover"
										),
										average: avgTurnoverRisk,
									},
									{
										metric: t(
											"metrics.employee_reputation"
										),
										average: avgReputationScore,
									},
									{
										metric: t(
											"metrics.career_growth_potential"
										),
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

				<Separator className="border-dashed my-6 px-4" />

				<Card className="@container/card mx-4 my-2">
					<CardHeader className="relative">
						<CardTitle>
							5. {t("steps.turnoverVSReputation.title")}
						</CardTitle>
						<CardDescription>
							{t("steps.turnoverVSReputation.description")}
						</CardDescription>
						<div className="absolute right-4 top-4">
							<ToggleGroup
								type="single"
								value={timeRange}
								onValueChange={setTimeRange}
								variant="outline"
								className="@[767px]/card:flex hidden"
							>
								<ToggleGroupItem
									value="all"
									className="h-8 px-2.5"
								>
									{t("employees.all")}
								</ToggleGroupItem>
							</ToggleGroup>
						</div>
					</CardHeader>
					<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
						<ChartContainer
							config={chartConfig}
							className="aspect-auto h-[250px] w-full"
						>
							<AreaChart
								data={selectedCompany.employees.map((emp) => ({
									employee: emp.name,
									risk_of_employee_turnover:
										emp.risk_of_employee_turnover,
									employee_reputation:
										emp.employee_reputation,
								}))}
							>
								<defs>
									<linearGradient
										id="fillTurnover"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop
											offset="5%"
											stopColor="var(--color-turnover)"
											stopOpacity={0.8}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-turnover)"
											stopOpacity={0.1}
										/>
									</linearGradient>
									<linearGradient
										id="fillReputation"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop
											offset="5%"
											stopColor="var(--color-reputation)"
											stopOpacity={0.8}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-reputation)"
											stopOpacity={0.1}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid
									vertical={false}
									strokeDasharray="3 3"
								/>
								<XAxis
									dataKey="employee"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									domain={[0, 100]}
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											labelFormatter={(value) => value}
											indicator="dot"
										/>
									}
								/>
								<Area
									dataKey="risk_of_employee_turnover"
									type="natural"
									fill="url(#fillTurnover)"
									stroke="var(--color-turnover)"
									stackId="a"
								/>
								<Area
									dataKey="employee_reputation"
									type="natural"
									fill="url(#fillReputation)"
									stroke="var(--color-reputation)"
									stackId="a"
								/>
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
