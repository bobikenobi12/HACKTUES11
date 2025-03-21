import { TrendingDownIcon, TrendingUpDown, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useMessages } from "@/hooks/useMessages";
import type { EmployeeAnalysis } from "@/routes/_nav/_auth/analytics";

export function parseEmployeeAnalysis(data: EmployeeAnalysis) {
	return Object.keys(data.calculated_metrics).map((key) => {
		const calculated =
			data.calculated_metrics[
				key as keyof typeof data.calculated_metrics
			];
		const adjusted =
			data.adjusted_metrics[key as keyof typeof data.adjusted_metrics];
		const trend =
			adjusted > calculated
				? "up"
				: adjusted < calculated
					? "down"
					: "neutral";
		const analysis = data.analysis[key as keyof typeof data.analysis];

		return {
			metric: key,
			calculated,
			adjusted,
			trend,
			analysis,
		};
	});
}

export function SectionCards(metrics: EmployeeAnalysis) {
	const { t } = useMessages("charts");

	const parsedMetrics = parseEmployeeAnalysis(metrics);
	console.log(parsedMetrics);
	return (
		<div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
			{parsedMetrics.map(
				({ metric, calculated, adjusted, trend, analysis }, index) => (
					<Card className="@container/card" key={index}>
						<CardHeader className="relative">
							<CardDescription>
								{t(`metrics.${metric as keyof typeof t}`)}
							</CardDescription>
							<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
								{calculated}
							</CardTitle>
							<div className="absolute right-4 top-4">
								<Badge
									variant="outline"
									className="flex gap-1 rounded-lg text-xs"
								>
									{adjusted} Adjusted
								</Badge>
							</div>
						</CardHeader>
						<CardFooter className="flex-col items-start gap-1 text-sm">
							<div className="line-clamp-1 flex gap-2 font-medium">
								{trend === "neutral"
									? "No change"
									: trend === "up"
										? "Trending Up"
										: "Trending Down"}
								{trend === "neutral" ? (
									<TrendingUpDown className="size-4" />
								) : trend === "up" ? (
									<TrendingUpIcon className="size-4" />
								) : (
									<TrendingDownIcon className="size-4" />
								)}
							</div>
							<div className="text-muted-foreground">
								{analysis}
							</div>
						</CardFooter>
					</Card>
				)
			)}
		</div>
	);
}
