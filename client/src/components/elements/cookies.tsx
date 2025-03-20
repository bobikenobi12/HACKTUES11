import { Button } from "@/components/ui/button";
import { useMessages } from "@/hooks/useMessages";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

export interface CookiesProps {}

const cookiesKey = "hrbuddy_cookies_consent";

export const Cookies: React.FC<CookiesProps> = () => {
	const { t } = useMessages("misc");

	const [isVisible, setIsVisible] = useState(false);
	const cookiesRef = useRef<HTMLDivElement>(null);
	const [timeline, setTimeline] = useState<gsap.core.Timeline>();

	const acceptCookies = () => {
		setIsVisible(false);
		localStorage.setItem(cookiesKey, "accepted");
	};

	useEffect(() => {
		if (!timeline || !cookiesRef.current) return;

		if (isVisible) {
			timeline.play();
		} else {
			timeline.reverse();
		}
	}, [isVisible, timeline]);

	useEffect(() => {
		if (cookiesRef.current) {
			gsap.set(cookiesRef.current, { display: "none" });

			const tl = gsap.timeline({ paused: true }).fromTo(
				cookiesRef.current,
				{
					y: 20,
					scale: 0.85,
					opacity: 0,
				},
				{
					y: 0,
					scale: 1,
					opacity: 1,
					duration: 0.5,
					ease: "expo.out",
					onReverseComplete: () => {
						gsap.set(cookiesRef.current, { display: "none" });
					},
					onStart: () => {
						gsap.set(cookiesRef.current, { display: "block" });
					},
				}
			);

			setTimeline(tl);
		}

		if (!localStorage.getItem(cookiesKey)) {
			setTimeout(() => {
				setIsVisible(true);
			}, 3000);
		}
	}, []);

	return (
		<div
			className="fixed bottom-4 left-4 z-40 w-fit max-w-[90%] rounded-md border-2 border-border bg-primary p-5 sm:max-w-[50%] md:bottom-10 md:left-10 xl:p-10"
			ref={cookiesRef}
		>
			<h4 className="text-xl text-accent">{t("cookies.title")}</h4>

			<p className="mb-5 mt-2">{t("cookies.description")}</p>

			<Button onClick={acceptCookies}>{t("cookies.accept")}</Button>
		</div>
	);
};
