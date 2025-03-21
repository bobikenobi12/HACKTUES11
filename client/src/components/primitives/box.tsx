import type { ReactFCWithChildren } from "@/types";
import clsx from "clsx";

export interface BoxProps {
	dashed?: boolean;
	size?: "small" | "medium";
	white?: boolean;
	className?: string;
}

export const Box: ReactFCWithChildren<BoxProps> = ({
	dashed,
	size = "medium",
	white,
	className,
	children,
}) => {
	return (
		<div
			className={clsx(
				"relative rounded-md border-2 border-border",
				size === "medium" ? "p-5 xl:p-10" : "p-3 md:p-5",
				white ? "bg-white" : "bg-primary/10",
				{ "border-dashed": dashed },
				className
			)}
		>
			{children}
		</div>
	);
};
