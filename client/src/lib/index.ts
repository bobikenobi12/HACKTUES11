export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

export const asyncTimeout = (ms: number) =>
	new Promise((res) => setTimeout(res, ms));
