import { ThemeProvider } from "@/app/providers/theme-provider";
import { Auth } from "@/shared/auth/ui/Auth";
import { AppLayout } from "@/shared/ui/layouts/AppLayout";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => {
	return (
		<ThemeProvider>
			<AppLayout>
				<Auth>
					<Outlet />
				</Auth>
			</AppLayout>
		</ThemeProvider>
	);
};

export const Route = createRootRoute({ component: RootLayout });
