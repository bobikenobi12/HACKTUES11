import { AppSidebar } from "@/components/main/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

const AuthenticatedLayout = () => {
	return (
		<SidebarProvider>
			<AppSidebar variant="inset" />
			<SidebarInset>
				{/* <SiteHeader /> */}
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							{/* <SectionCards /> */}
							{/* <div className="px-4 lg:px-6">
								<ChartAreaInteractive />
							</div>
							<DataTable data={data} /> */}
							<Outlet />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export const Route = createFileRoute("/_nav/_auth")({
	beforeLoad: () => {
		const session = useAuthStore.getState().session;
		if (!session) {
			toast("You need to sign in to access this page.", {
				description: "You need to be log in to access this page.",
				duration: 5000,
			});

			throw redirect({ to: "/login" });
		}
	},
	component: AuthenticatedLayout,
});
