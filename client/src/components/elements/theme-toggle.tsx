import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<button onClick={toggleTheme}>
			Switch to {theme === "light" ? "dark" : "light"} mode
		</button>
	);
};

export default ThemeToggle;
