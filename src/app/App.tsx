import type { FC } from "react";
import { ThemeProvider } from "./providers/theme-provider";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./router/routeTree.gen";
import { AppLayout } from "@/shared/ui/layouts/AppLayout";
import { Auth } from "@/shared/auth/ui/Auth";

// Create a new router instance
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

interface IAppProps {}

export const App: FC<IAppProps> = (props) => {
	return (
		<ThemeProvider>
			<AppLayout>
				<Auth>
					<RouterProvider router={router} />
				</Auth>
			</AppLayout>
		</ThemeProvider>
	);
};
