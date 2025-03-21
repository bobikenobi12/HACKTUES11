import { ProfileDialog } from "@/components/dialogs/profile-dialog";
import { AppLoader } from "@/components/layout/app-loader";
import CookieConsent from "@/components/ui/cookies";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<AppLoader />
			<CookieConsent />
			<div vaul-drawer-wrapper="" className="bg-background">
				<Outlet />
			</div>

			<ProfileDialog />
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
