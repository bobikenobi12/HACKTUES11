import { create } from "zustand";

export interface DialogStates {
	profileDialog: boolean;
	setProfileDialog: (open: boolean) => void;
}

export const useDialogStore = create<DialogStates>((set) => ({
	profileDialog: false,
	setProfileDialog: (open: boolean) => set({ profileDialog: open }),
}));
