import type { EnsureQueryDataOptions } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const ensureQueryData = <T>(options: EnsureQueryDataOptions<T>) =>
	queryClient.ensureQueryData(options);
