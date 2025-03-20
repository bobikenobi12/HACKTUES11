import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { capitalize } from "./index";

// BG translations
import bgMisc from "@/locales/bg/misc.json";

// EN translations
import enMisc from "@/locales/en/misc.json";

export const resources = {
	en: {
		misc: enMisc,
	},
	bg: {
		misc: bgMisc,
	},
} as const;

// Resource Types
export type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType]: ObjectType[Key] extends object
		? `${Key & string}.${NestedKeyOf<ObjectType[Key]>}`
		: Key & string;
}[keyof ObjectType];

export type Namespace = keyof typeof resources.en;
export type MessageKeys<ns extends Namespace = Namespace> = ns extends any
	? NestedKeyOf<(typeof resources.en)[ns]>
	: never;

i18n.use(initReactI18next).use(LanguageDetector).init({
	resources,
	fallbackLng: "en",
	debug: true,
});

// For Sanity
export const locales = [
	{ code: "en", iso: "en-GB", name: "English", abbr: "en" },
	{ code: "bg", iso: "bg-BG", name: "Български", abbr: "bg" },
] as const;
export const defaultLocale = "en";
export const messageKeys = Object.entries(resources.en).reduce((acc, cur) => {
	const [key, value] = cur;
	const keys = Object.keys(value as any).map((k) => `${key}${capitalize(k)}`);
	return [...acc, ...keys];
}, [] as string[]);

export default i18n;
