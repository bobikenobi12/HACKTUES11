import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useCompanyStore } from "@/stores/company-store";
import { TrendingUpIcon } from "lucide-react";

import { useMessages } from "@/hooks/useMessages";
import { Badge } from "../ui/badge";

export function SectionCards() {
	const { t } = useMessages("charts");

	const selectedCompany = useCompanyStore((state) => state.selectedCompany);

	if (!selectedCompany) {
		return null;
	}

	return (
		<div className="grid grid-cols-1 gap-4">
			<Card className="mx-4 my-2">
				<CardHeader>
					<CardTitle className="text-xl font-semibold">
						2. {t("steps.employeeDetails")}
					</CardTitle>
				</CardHeader>
			</Card>
			<div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-4">
				{/* header 1 for first cards, afterwards startinw with charts */}

				{selectedCompany.employees.map((employee) => (
					<Card key={employee.id} className="@container/card">
						<CardHeader className="relative">
							<CardDescription>{employee.name}</CardDescription>
							<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
								{t("employeeOverview.efficiency", {
									points: employee.employee_efficiency,
								})}
							</CardTitle>
							<div className="absolute right-4 top-0">
								<Badge
									variant="outline"
									className="flex gap-1 rounded-lg text-xs"
								>
									<TrendingUpIcon className="size-3" />
									{t("employeeOverview.reputation", {
										points: employee.employee_reputation,
									})}
								</Badge>
							</div>
						</CardHeader>
						<CardFooter className="flex-col items-start gap-1 text-sm">
							<div className="line-clamp-1 flex gap-2 font-medium">
								{t("employeeOverview.careerGrowth", {
									points: employee.career_growth_potential,
								})}
							</div>
							<div className="text-muted-foreground">
								{t("employeeOverview.riskOfBribery", {
									points: employee.risk_of_bribery,
								})}
							</div>
							<div className="text-muted-foreground">
								{t("employeeOverview.riskOfTurnover", {
									points: employee.risk_of_employee_turnover,
								})}
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
