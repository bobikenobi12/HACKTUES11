import { useAuthStore } from "@/stores/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

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
	component: () => <p>Need to implement a component here.</p>,
});

// const ProfilePage = () => {
//     return (
//       <HSection>
//         <HContainer>
//           <div className="flex flex-col md:flex-row">
//             <div className="mb-8 shrink-0 md:mb-0 md:w-[15%] md:pr-10">
//               <AuthSidebar />
//             </div>

//             <div className="flex-1">
//               <Outlet />
//             </div>
//           </div>
//         </HContainer>
//       </HSection>
//     );
//   };
