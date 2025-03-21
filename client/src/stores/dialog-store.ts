import { create } from "zustand";

export interface DialogStates {
	profileDialog: boolean;
	gatherAnalyticsDialog: boolean;
	setProfileDialog: (open: boolean) => void;
	setGatherAnalyticsDialog: (open: boolean) => void;
}

export const useDialogStore = create<DialogStates>((set) => ({
	profileDialog: false,
	gatherAnalyticsDialog: false,
	setProfileDialog: (open: boolean) => set({ profileDialog: open }),
	setGatherAnalyticsDialog: (open: boolean) =>
		set({ gatherAnalyticsDialog: open }),
}));
