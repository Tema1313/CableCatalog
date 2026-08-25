import type { FC } from "react";
import { ThemeProvider } from "./providers/theme-provider";

interface IAppProps {}

export const App: FC<IAppProps> = (props) => {
	return (
		<ThemeProvider>
			<div></div>
		</ThemeProvider>
	);
};
