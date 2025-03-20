import { Cookies } from "@/components/elements/cookies";
import { AppLoader } from "@/components/layout/app-loader";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<AppLoader />
			<Cookies />
			<Outlet />
			<Toaster />
			{/* <AuthSubscriber /> */}
			{/* <GlobalData /> */}
			{/* <ConfirmDialog /> */}
			{import.meta.env.Mode === "development" && (
				<TanStackRouterDevtools />
			)}
		</>
	),
});
