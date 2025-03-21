import { createFileRoute } from "@tanstack/react-router";

import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";

import { SectionCards } from "@/components/main/section-cards";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useMessages } from "@/hooks/useMessages";
import i18n from "@/lib/i18n";

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
	points: {
		label: i18n.t("charts:metrics.calculatedMetrics"),
		color: "hsl(var(--chart-1))",
	},
	label: {
		color: "hsl(var(--background))",
	},
} satisfies ChartConfig;

export const data: EmployeeAnalysis = {
	metrics: {
		risk_of_bribery: 0.2,
		employee_efficiency: 0.8,
		risk_of_employee_turnover: 0.4,
		employee_reputation: 0.6,
		career_growth_potential: 0.9,
	},
	analysis: {
		risk_of_bribery:
			"Strong loyalty, good ethical integrity, and a solid professional reputation result in low risk.",
		employee_efficiency: "Overall weak employee efficiency.",
		risk_of_employee_turnover:
			"Very low turnover risk: Employee has long tenure and exhibits high loyalty.",
		employee_reputation:
			"Strong reputation: Good ethical integrity and online reputation but needs more professional references.",
		career_growth_potential:
			"Very limited career growth potential: Education, experience, and career progression all need improvement.",
	},
};

function AnalyticsPage() {
	const { t } = useMessages("charts");
	// const { data, isLoading, isError } = useQuery({
	// 	queryKey: ["analytics"],
	// 	queryFn: async () => {
	// 		const response = await fetch(
	// 			`${import.meta.env.VITE_SERVER_URL}/external/analyze`,
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization: `Bearer ${
	// 						JSON.parse(
	// 							localStorage.getItem("client-session") || "{}"
	// 						).token
	// 					}`,
	// 				},
	// 			}
	// 		);
	// 		if (!response.ok) {
	// 			throw new Error("Network response was not ok");
	// 		}

	// 		const data: EmployeeAnalysis = await response.json();

	// 		return data;
	// 	},
	// });

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	// if (isError) {
	// 	return <div>Error...</div>;
	// }
	return (
		<section className="flex flex-col gap-3 ">
			<div className="flex flex-col gap-3">
				{/* <CircularProgress metric={t("metrics.riskOfBribery")} c */}

				<SectionCards {...data} />
			</div>
			<AnalysisBarChart
				chartData={[
					{
						metric: t("metrics.risk_of_bribery"),
						points: data?.metrics.risk_of_bribery || 0,
					},
					{
						metric: t("metrics.employee_efficiency"),
						points: data?.metrics.employee_efficiency || 0,
					},
					{
						metric: t("metrics.risk_of_employee_turnover"),
						points: data?.metrics.risk_of_employee_turnover || 0,
					},
					{
						metric: t("metrics.employee_reputation"),
						points: data?.metrics.employee_reputation || 0,
					},
					{
						metric: t("metrics.career_growth_potential"),
						points: data?.metrics.career_growth_potential || 0,
					},
				]}
			/>
		</section>
	);
}

interface AnalysisBarChartProps {
	metric: string;
	points: number;
}

export function AnalysisBarChart({
	chartData,
}: {
	chartData: AnalysisBarChartProps[];
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Bar Chart - Employee Analysis</CardTitle>
				<CardDescription>Based on 5 metrics</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							right: 16,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey="metric"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							hide
						/>
						<XAxis dataKey="calculated" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Bar
							dataKey="calculated"
							layout="vertical"
							fill="var(--color-calculated)"
							radius={4}
						>
							<LabelList
								dataKey="metric"
								position="insideLeft"
								offset={8}
								className="fill-[--color-label]"
								fontSize={12}
							/>
							<LabelList
								dataKey="calculated"
								position="right"
								offset={8}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				{/* <div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this metric{" "}
					<TrendingUp className="h-4 w-4" />
				</div> */}
				<div className="leading-none text-muted-foreground">
					Showing calculated and adjusted metrics
				</div>
			</CardFooter>
		</Card>
	);
}
