import { Spinner } from "@/components/primitives/spinner";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

export interface AppLoaderProps {}

export const AppLoader: React.FC<AppLoaderProps> = () => {
	const loaderWrapper = useRef(null);
	const contentWrapper = useRef(null);

	useEffect(() => {
		gsap.to(contentWrapper.current, {
			scale: 0.85,
			opacity: 0,
			filter: "blur(2px)",
			duration: 0.4,
			ease: "power2.inOut",
			delay: 1,
		});
		gsap.to(loaderWrapper.current, {
			opacity: 0,
			duration: 0.4,
			ease: "power2.inOut",
			delay: 1.4,
			onComplete: () => {
				gsap.set(loaderWrapper.current, { display: "none" });
			},
		});
	}, []);

	return (
		<div
			className="!fixed inset-0 z-50 h-screen bg-peach-base"
			ref={loaderWrapper}
		>
			<div
				className="flex h-full flex-col items-center justify-center"
				ref={contentWrapper}
			>
				<img
					className="mb-3 h-20"
					src="/logo-symbol.svg"
					alt="Meliora Logo"
				/>
				<Spinner size="small" />
			</div>
		</div>
	);
};
