import { create } from "zustand";

export interface DialogStates {
	profileDialog: boolean;
	gatherAnalyticsDialog: boolean;
	viewEmployeeSheet: boolean;
	setProfileDialog: (open: boolean) => void;
	setGatherAnalyticsDialog: (open: boolean) => void;
	setViewEmployeeSheet: (open: boolean) => void;
}

export const useDialogStore = create<DialogStates>((set) => ({
	profileDialog: false,
	gatherAnalyticsDialog: false,
	viewEmployeeSheet: false,
	setProfileDialog: (open: boolean) => set({ profileDialog: open }),
	setGatherAnalyticsDialog: (open: boolean) =>
		set({ gatherAnalyticsDialog: open }),
	setViewEmployeeSheet: (open: boolean) => set({ viewEmployeeSheet: open }),
}));
