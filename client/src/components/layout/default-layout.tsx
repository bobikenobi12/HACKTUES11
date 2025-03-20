// import { Footer } from "@/components/layout/Footer";
// import { Header } from "@/components/layout/Header";
// import { useGlobalStore } from "@/stores/globalStore";
import { Outlet } from "@tanstack/react-router";
// import { PageTransition } from "./PageTransition";

export const DefaultLayout = () => {
	//   const header = useGlobalStore((state) => state.header);
	//   const footer = useGlobalStore((state) => state.footer);

	return (
		// <PageTransition>
		<div className="relative flex min-h-screen flex-col">
			{/* <Header {...header} /> */}

			<main className="w-full flex-1 overflow-x-hidden">
				<Outlet />
			</main>

			{/* <Footer {...footer} /> */}

			{/* <CartModal /> */}
		</div>
	);
};
{
	/* </PageTransition> */
}
