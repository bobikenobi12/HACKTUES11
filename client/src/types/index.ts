export type ReactFCWithChildren<T> = React.FC<React.PropsWithChildren<T>>;

export const categoryColors = [
	"peach",
	"green",
	"blue",
	"purple",
	"default",
] as const;
export type CategoryColor = (typeof categoryColors)[number];
