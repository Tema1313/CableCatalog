import type { FC, ReactNode } from "react";
import { Navigation } from "../navigation/Navigation";
import { useAuth } from "@/shared/auth/hooks/useAuth";

interface IAppLayoutProps {
	children?: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = (props) => {
	const auth = useAuth();
	return (
		<div className="flex h-screen flex-col">
			<header className="h-16 border-b flex items-center content-center px-6 bg-sidebar">
				<div className="font-extrabold text-xl">CSS Modules</div>
				{auth.isLoggedIn && <Navigation />}
			</header>
			<div className="flex flex-1 overflow-hidden">
				<main className="flex-1 overflow-auto">{props.children}</main>
			</div>
		</div>
	);
};
