import type { LoginFormSchema } from "@/components/forms/login-form";
import i18n from "@/lib/i18n";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";
import { useMessages } from "./useMessages";

export const specialCharsRegex = /^(?=.*\d|\W)/;
export const lowercaseRegex = /^(?=.*[a-z])/;
export const uppercaseRegex = /^(?=.*[A-Z])/;

export const passwordRules = z
	.string()
	.regex(specialCharsRegex, i18n.t("auth:errors.password"))
	.regex(lowercaseRegex, i18n.t("auth:errors.password"))
	.regex(uppercaseRegex, i18n.t("auth:errors.password"))
	.min(8, i18n.t("auth:errors.passwordLength"));

export const signUpFormSchema = z.object({
	name: z.string().min(2, i18n.t("auth:errors.obligatory")),
	email: z.string().email(i18n.t("auth:errors.email")),
	password: passwordRules,
	// hcaptcha: z.string().min(1, i18n.t("auth:errors.obligatory")),
});
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const editProfileSchema = z.object({
	name: z.string().min(2, i18n.t("auth:errors.obligatory")),
	email: z.string().email(i18n.t("auth:errors.email")),
	phone: z.string().refine(isValidPhoneNumber, {
		message: i18n.t("auth:errors.phoneNumber"),
	}),
});
export type EditProfileValues = z.infer<typeof editProfileSchema>;

export const passwordFormSchema = z.object({
	oldPassword: z.string(),
	password: passwordRules,
});
export type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export const useAuth = (navigateTo?: string) => {
	const navigate = useNavigate();
	// const queryClient = useQueryClient();
	const { t } = useMessages("auth");

	const session = useAuthStore((state) => state.session);
	const user = useAuthStore((state) => state.userProfile);
	const setSession = useAuthStore((state) => state.setSession);
	// const setProfile = useAuthStore((state) => state.setProfile);

	// Sign Up / Register
	// const signUp = useMutation({
	// 	mutationFn: async (values: SignUpFormValues) => {
	// 		const response = await fetch(
	// 			`${import.meta.env.VITE_API_URL}/auth/signup`,
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({
	// 					// username: values.username,
	// 					email: values.email,
	// 					password: values.password,
	// 					name: values.name,
	// 					// phoneNumber: values.phone,
	// 					// countryCode: values.phoneCountryCode,
	// 					local: i18n.language,
	// 				}),
	// 			}
	// 		);

	// 		const data = await response.json();

	// 		if (!response.ok) {
	// 			toast.error(t("errors.unknown"), {
	// 				description: data.message || "Something went wrong",
	// 			});
	// 			throw new Error(data.message);
	// 		}

	// 		if (navigateTo)
	// 			navigate({
	// 				to: navigateTo,
	// 				// to: "/check-your-email",
	// 			});

	// 		return data;
	// 	},
	// });

	// // Login
	const login = useMutation({
		mutationFn: async (values: LoginFormSchema) => {
			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: values.username,
						password: values.password,
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				toast.error(t("errors.unknown"), {
					description: data.message || "Something went wrong",
				});
				throw new Error(data.message);
			}

			// Set Session
			setSession({
				token: data.token,
			});

			toast.success(
				t("loginSuccess.title", {
					username: values.username,
				}),
				{
					description: t("loginSuccess.description"),
				}
			);

			if (navigateTo)
				navigate({
					to: navigateTo,
				});

			return data;
		},
	});

	// Update Session
	// const updateSession = (session: Session) => {
	// 	setSession(session);
	// 	setProfile(session);

	// 	queryClient.invalidateQueries({
	// 		queryKey: ["profile"],
	// 	});
	// };

	// // Update / Edit Profile
	// const editProfile = useMutation({
	// 	mutationFn: async (values: Partial<UserProfile>) => {
	// 		const { data, error } = await supabase.auth.updateUser({
	// 			email: values.email!,
	// 			phone: values.phone || "",
	// 			data: {
	// 				name: values.name,
	// 				phone: values.phone,
	// 			},
	// 			// phone: values.phone,
	// 		});

	// 		if (error) {
	// 			throw error;
	// 		}

	// 		const s = await supabase.auth.getSession();

	// 		if (s.data.session) updateSession(s.data.session);

	// 		return data;
	// 	},
	// });

	// Change Password
	// const changePassword = useMutation({
	// 	mutationFn: async (values: PasswordFormValues) => {
	// 		try {
	// 			const { error } = await supabase.auth.updateUser({
	// 				password: values.password,
	// 				nonce: values.oldPassword,
	// 			});

	// 			if (error) {
	// 				console.error("error", error.message);

	// 				toast({
	// 					title: t("changePasswordError"),
	// 					description: error?.message,
	// 					variant: "destructive",
	// 				});

	// 				throw error;
	// 			}

	// 			toast({
	// 				title: t("changePasswordSuccess"),
	// 				variant: "default",
	// 			});

	// 			return;
	// 		} catch (error: any) {
	// 			toast({
	// 				title: t("changePasswordError"),
	// 				description: error?.message,
	// 				variant: "destructive",
	// 			});
	// 		}
	// 	},
	// });

	// // Delete User
	// const deleteUser = useMutation({
	// 	mutationFn: async () => {
	// 		const id = session?.user.id;
	// 		if (!id) return;

	// 		const { error } = await supabase.auth.admin.deleteUser(
	// 			session?.user.id
	// 		);

	// 		if (error) {
	// 			throw error;
	// 		}

	// 		return;
	// 	},
	// });

	// const signOut = useMutation({
	// 	mutationFn: async () => {
	// 		const { error } = await supabase.auth.signOut();
	// 		if (error) {
	// 			toast({
	// 				title: "Error signing out",
	// 				description: error.message,
	// 				variant: "destructive",
	// 			});
	// 			throw error;
	// 		}

	// 		toast({
	// 			title: "Signed out",
	// 			description: "You have been signed out",
	// 		});
	// 		navigate({ to: "/" as string });
	// 		return;
	// 	},
	// });

	// Auth Links
	const authLinks = useMemo(
		() => [
			{
				name: t("profileTabs.dashboard"),
				url: "/dashboard",
				customUrl: true,
				customName: true,
			},
			{
				name: t("profileTabs.profile"),
				url: "/profile",
				customUrl: true,
				customName: true,
			},
			{
				name: t("profileTabs.addresses"),
				url: "/history",
				customUrl: true,
				customName: true,
			},
			{
				name: t("profileTabs.orders"),
				url: "/analytics",
				customUrl: true,
				customName: true,
			},
			{
				name: t("profileTabs.logout"),
				customName: true,
				// onClick: signOut.mutate,
			},
		],
		[
			// signOut.mutate
		]
	);

	return {
		// signUp,
		// editProfile,
		// updateSession,
		// changePassword,
		// deleteUser,
		// signOut,
		login,
		authLinks,
		session,
		user,
	};
};
