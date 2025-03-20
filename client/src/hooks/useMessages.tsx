// import { LangCode, LocaleField } from "@/types/sanity";
import type { MessageKeys, Namespace } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
// import type { PortableTextBlock } from "@portabletext/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useMessages = <NS extends Namespace = Namespace>(
	namespace?: NS | NS[]
) => {
	const { i18n, t: translate } = useTranslation(namespace);
	const { language, changeLanguage } = i18n;

	/**
	 * Translates a localized (sanitizable) object field.
	 */

	const t = useCallback(
		(key: MessageKeys<NS>, interpolations?: any) => {
			const translated = translate(
				key as string,
				interpolations
			) as string;

			if (translated === key && Array.isArray(namespace)) {
				for (const ns of namespace as string[]) {
					const nsKey = `${ns}:${key}`;
					const nsTranslated = translate(
						nsKey as string,
						interpolations
					) as string;

					if (nsTranslated !== key) {
						return nsTranslated;
					}
				}
			}

			return translated;
		},
		[namespace, translate]
	);

	return { t, language, changeLanguage, locales };
};
