import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useMessages } from "@/hooks/useMessages";
import { useLocation } from "@tanstack/react-router";

const locationToNavigation = {
	"/dashboard": "header.links.dashboard",
	"/employees": "header.links.employees",
	"/analytics": "header.links.analytics",
	"/settings": "header.links.settings",
};
export function SiteHeader() {
	const location = useLocation();
	const { t } = useMessages("nav");

	return (
		<header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<h1 className="text-base font-medium">
					{t(
						locationToNavigation[
							location.pathname as keyof typeof locationToNavigation
						] as any
					)}
				</h1>
			</div>
		</header>
	);
}
