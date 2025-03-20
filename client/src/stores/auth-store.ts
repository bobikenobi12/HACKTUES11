import { create } from "zustand";

export interface Session {
	token: string;
	expires: number;
	user_id: string;
	role: string;
}

export interface UserProfile {
	name?: string;
	email?: string | null;
	phone?: string | null;
	newsletter?: boolean;
	locale?: string;
	//   avatar_url?: string;
	//   email_verified?: boolean;
	//   full_name?: string;
	//   phone_verified?: boolean;
	//   default_delivery_address?: string | null;
	//   default_billing_address?: string | null;
}

interface AuthStore {
	session: Session | null;
	userProfile: UserProfile | null;
	setSession: (session: Session | null) => void;
	setProfile: (profile: UserProfile | null) => void;
}
export const useAuthStore = create<AuthStore>()((set) => ({
	session: JSON.parse(localStorage.getItem("client-session") || "null"),
	userProfile: JSON.parse(localStorage.getItem("user-profile") || "null"),
	setSession: (session: Session | null) => {
		if (session) {
			localStorage.setItem("client-session", JSON.stringify(session));
		} else {
			localStorage.removeItem("client-session");
		}
		set({ session });
	},
	setProfile: (profile: UserProfile | null) => {
		if (profile) {
			localStorage.setItem("user-profile", JSON.stringify(profile));
		} else {
			localStorage.removeItem("user-profile");
		}
		set({ userProfile: profile });
	},
}));
