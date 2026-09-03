import { useAuth } from "@/shared/auth/hooks/useAuth";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu";
import { LogOut } from "lucide-react";
import type { FC } from "react";

interface IProfileNavigationProps {}

export const ProfileNavigation: FC<IProfileNavigationProps> = (props) => {
	const auth = useAuth();

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Пользователь</NavigationMenuTrigger>
					<NavigationMenuContent>
						<NavigationMenuLink
							onClick={() => auth.resetLogin()}
							className="align-middle flex flex-row cursor-pointer "
						>
							<LogOut /> Выход
						</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
