import type { ReactFCWithChildren } from "@/types";
import clsx from "clsx";
import { memo } from "react";

export interface SectionProps {
	className?: string;
	my?: string;
	myLarge?: boolean;
}

export const Section: ReactFCWithChildren<SectionProps> = memo(
	({ className, my, myLarge, children }) => {
		return (
			<section
				className={clsx(
					"first:pt-8 md:first:pt-20",
					className,
					my ||
						(myLarge
							? "my-18 sm:my-28"
							: "my-12 sm:my-16 2xl:my-24")
				)}
			>
				{children}
			</section>
		);
	}
);
