import React, { memo } from "react";
// import { Link } from "@/types/sanity";
import { useAuth } from "@/hooks/use-auth";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserIcon } from "lucide-react";
import { LanguagePicker } from "../elements/language-picker";
// import { HBurger } from "../primitives/HBurger";
// import { MobileNav } from "./MobileNav";

gsap.registerPlugin(ScrollTrigger);

// export interface HeaderProps {
//   links?: Link[];
//   rightLinks?: Link[];
//   action?: Link;
//   dark?: boolean;
// }

export const linkStyle = "px-2 xl:px-3 py-2 text-md md:text-sm";

export const Header: React.FC = memo(() =>
	// { links, rightLinks, action, dark }
	{
		// const { l } = useMessages();
		// const { colors } = useTheme();
		const lg = useMediaQuery("min-width: 1024px");
		const xl = useMediaQuery("min-width: 1280px");

		// Auth
		const { user, authLinks } = useAuth();

		// Bckg
		// const [isDark, setIsDark] = useState(dark);
		// useEffect(() => {
		//   setIsDark(dark);
		// }, [dark]);

		// const headerRef = useRef(null);
		// useEffect(() => {
		//   if (!headerRef.current) return;

		//   gsap.fromTo(
		//     headerRef.current,
		//     {
		//       background: "transparent",
		//     },
		//     {
		//       background: colors.white.base,
		//       duration: 0.4,
		//       ease: "expo.inOut",
		//       scrollTrigger: {
		//         trigger: headerRef.current,
		//         start: "0 top",
		//         end: "+=10",
		//         toggleActions: "play none reverse none",
		//       },
		//       onStart: () => {
		//         if (dark) setIsDark(false);
		//       },
		//       onReverseComplete: () => {
		//         if (dark) setIsDark(true);
		//       },
		//     },
		//   );
		// }, [colors.white.base, dark]);

		return (
			<>
				<header
					className={clsx(
						"fixed left-0 right-0 top-0 z-30 h-14 bg-transparent px-5 text-sm md:h-20"
						// { dark: dark && isDark },
					)}
					//   ref={headerRef}
				>
					<div className="flex h-full items-center justify-between transition-[color] duration-300 ease-in-out dark:text-white-base">
						{lg && (
							<div className="flex-1">
								{/* {links?.map((link, idx) => (
                  <HLink
                    key={`header-link-${idx}`}
                    className={linkStyle}
                    hasHover
                    {...link}
                    dropdownPosition={idx === 0 ? "left" : undefined}
                  />
                ))}
                {rightLinks?.map((link, idx) => (
                  <HLink
                    key={`header-right-link-${idx}`}
                    className={linkStyle}
                    hasHover
                    {...link}
                  />
                ))} */}
							</div>
						)}

						<div className="shrink-0">
							<Link to="/">
								<img
									className="h-8 2xl:h-10"
									src={"/logo-symbol.svg"}
									alt="HR-buddy Logo"
								/>
							</Link>
						</div>

						<div className="xm:gap-1 flex flex-1 items-center justify-end gap-0.5">
							{/* <div>
              {rightLinks?.map((link, idx) => (
                <HLink
                  key={`header-right-link-${idx}`}
                  className={linkStyle}
                  hasHover
                  {...link}
                />
              ))}
            </div> */}
							{lg && (
								<>
									<Link
										className="flex h-8 items-center justify-center rounded-md px-2 xl:h-10 xl:px-2.5"
										to={user ? "/dashboard" : "/login"}
									>
										<UserIcon className="size-4 shrink-0 xl:size-5" />

										{user && xl && (
											<div className="mr-1">
												{user.name?.split(" ")?.[0]}
											</div>
										)}
									</Link>

									<LanguagePicker />

									{/* {action && (
										<Link className="ml-2" {...action}>
											<Button className="transition-colors duration-300 ease-in-out">
												{action.customName
													? action.name
													: action.page?.name}
											</Button>
										</Link>
									)} */}
								</>
							)}

							{/* {!lg && <HBurger />} */}
						</div>
					</div>
				</header>

				{/* {!lg && <MobileNav />} */}
			</>
		);
	}
);
