import type { CategoryColor, ReactFCWithChildren } from "@/types";
import clsx from "clsx";

export interface ChipProps {
	color?: CategoryColor | "red";
	size?: "small" | "medium" | "large";
	rounded?: "sm" | "md" | "lg";
	className?: string;
}

export const Chip: ReactFCWithChildren<ChipProps> = ({
	color = "default",
	size = "medium",
	rounded = "lg",
	className,
	children,
}) => {
	return (
		<div
			className={clsx(
				className,
				"inline-block text-balance text-center leading-none",
				rounded === "lg"
					? "rounded-lg"
					: rounded === "md"
						? "rounded-md"
						: "rounded-sm",
				size === "small" ? "px-2 py-1 text-2xs" : "px-3 py-1.5",
				{
					"text-2xs sm:text-sm": size === "medium",
					"bg-black-base text-white-base": color === "default",
					"bg-peach-base": color === "peach",
					"bg-green-base": color === "green",
					"bg-blue-base": color === "blue",
					"bg-purple-base": color === "purple",
					"bg-accent-red text-white-base": color === "red",
				}
			)}
		>
			{children}
		</div>
	);
};
