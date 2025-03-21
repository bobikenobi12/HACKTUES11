import { create } from "zustand";

export interface DialogStates {
	profileDialog: boolean;
	gatherAnalyticsDialog: boolean;
	viewEmployeeSheet: boolean;
	settingsDialog: boolean;
	setProfileDialog: (open: boolean) => void;
	setGatherAnalyticsDialog: (open: boolean) => void;
	setViewEmployeeSheet: (open: boolean) => void;
	setSettingsDialog: (open: boolean) => void;
}

export const useDialogStore = create<DialogStates>((set) => ({
	profileDialog: false,
	gatherAnalyticsDialog: false,
	viewEmployeeSheet: false,
	settingsDialog: false,
	setProfileDialog: (open: boolean) => set({ profileDialog: open }),
	setGatherAnalyticsDialog: (open: boolean) =>
		set({ gatherAnalyticsDialog: open }),
	setViewEmployeeSheet: (open: boolean) => set({ viewEmployeeSheet: open }),
	setSettingsDialog: (open: boolean) => set({ settingsDialog: open }),
}));
