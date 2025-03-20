import i18n from "@/lib/i18n";
import { useAuthStore } from "@/stores/auth-store";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

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
	newsletter: z.boolean().default(false),
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
	// const navigate = useNavigate();
	// const queryClient = useQueryClient();
	// const { t } = useMessages("auth");

	const session = useAuthStore((state) => state.session);
	const user = useAuthStore((state) => state.userProfile);
	// const setSession = useAuthStore((state) => state.setSession);
	// const setProfile = useAuthStore((state) => state.setProfile);

	// Sign Up / Register
	// const signUp = useMutation({
	// 	mutationFn: async (values: SignUpFormValues) => {
	// 		const { data, error } = await supabase.auth.signUp({
	// 			email: values.email,
	// 			password: values.password,
	// 			options: {
	// 				emailRedirectTo: import.meta.env
	// 					.VITE_CONFIRM_EMAIL_REDIRECT_URL,
	// 				// captchaToken: values.hcaptcha,
	// 				data: {
	// 					name: values.name,
	// 					newsletter: values.newsletter,
	// 					locale: i18n.language,
	// 				},
	// 			},
	// 		});
	// 		if (error) {
	// 			toast.error(t("errors.unknown"), {
	// 				description: error.message,
	// 			});
	// 			throw error;
	// 		}
	// 		// captcha.current.reset();

	// 		if (navigateTo)
	// 			navigate({
	// 				to: navigateTo,
	// 				// to: "/check-your-email",
	// 			});

	// 		return data;
	// 	},
	// });

	// // Login

	// // Update Session
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

	// // Auth Links
	// const authLinks = useMemo(
	// 	() => [
	// 		{
	// 			name: t("profileTabs.dashboard"),
	// 			url: "/dashboard",
	// 			customUrl: true,
	// 			customName: true,
	// 		},
	// 		{
	// 			name: t("profileTabs.profile"),
	// 			url: "/profile",
	// 			customUrl: true,
	// 			customName: true,
	// 		},
	// 		{
	// 			name: t("profileTabs.addresses"),
	// 			url: "/address",
	// 			customUrl: true,
	// 			customName: true,
	// 		},
	// 		{
	// 			name: t("profileTabs.orders"),
	// 			url: "/orders",
	// 			customUrl: true,
	// 			customName: true,
	// 		},
	// 		{
	// 			name: t("profileTabs.manageSubscriptions"),
	// 			url: "/subscriptions",
	// 			customUrl: true,
	// 			customName: true,
	// 		},
	// 		{
	// 			name: t("profileTabs.rewardsProgram"),
	// 			url: "/rewards",
	// 			customUrl: true,
	// 			customName: true,
	// 		},
	// 		{
	// 			name: t("profileTabs.logout"),
	// 			customName: true,
	// 			onClick: signOut.mutate,
	// 		},
	// 	],
	// 	[signOut.mutate]
	// );

	return {
		// signUp,
		// editProfile,
		// updateSession,
		// changePassword,
		// deleteUser,
		// signOut,
		// authLinks,
		session,
		user,
	};
};
