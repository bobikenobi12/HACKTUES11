import { createFileRoute } from "@tanstack/react-router";

function DashboardPage() {
	return <div>Dashboard</div>;
}

export const Route = createFileRoute("/_nav/_auth/dashboard")({
	component: DashboardPage,
});
