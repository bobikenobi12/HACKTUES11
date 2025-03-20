import { useAuthStore } from "@/stores/auth-store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_nav/_guest")({
	beforeLoad: async () => {
		const session = useAuthStore.getState().session;

		if (session) {
			// toast({
			//   title: "You already signed in.",
			//   description: "You need to be log out to access this page.",
			//   type: "foreground",
			//   variant: "destructive",
			// });

			throw redirect({ to: "/" as string });
		}
	},
	component: () => <Outlet />,
});
