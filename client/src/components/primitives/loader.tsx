import type { ReactFCWithChildren } from "@/types";
import clsx from "clsx";
import { Spinner } from "./spinner";

export interface LoaderProps {
	isLoading: boolean;
	preloader?: boolean;
	size?: "small" | "medium" | "large";
	className?: string;
}

export const Loader: ReactFCWithChildren<LoaderProps> = ({
	isLoading,
	preloader,
	size,
	className,
	children,
}) => {
	return (
		<>
			{isLoading && (
				<div
					className={clsx(
						"inset-0 z-40 flex items-center justify-center rounded-sm",
						preloader
							? "h-full min-h-40 w-full"
							: "absolute bg-primary",
						className
					)}
				>
					<Spinner size={size} />
				</div>
			)}
			{preloader && isLoading ? undefined : children}
		</>
	);
};
