import { DefaultLayout } from "@/components/layout/default-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_nav")({
	component: () => <DefaultLayout />,
});
