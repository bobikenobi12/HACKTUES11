import type { ReactFCWithChildren } from "@/types";
import clsx from "clsx";
import { memo } from "react";

export interface ContainerProps {
	className?: string;
	tight?: boolean;
}

export const Container: ReactFCWithChildren<ContainerProps> = memo(
	({ className, tight, children }) => {
		return (
			<div
				className={clsx(
					"2k:px-0 2k:mx-auto 2k:w-[1600px] px-4 md:px-14 2xl:px-[7%]",
					{ "md:mx-auto md:w-4/5": tight },
					className
				)}
			>
				{children}
			</div>
		);
	}
);
