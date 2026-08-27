import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu";
import type { FC } from "react";

interface ICatalogNavigayionProps {}

export const CatalogNavigayion: FC<ICatalogNavigayionProps> = (props) => {
	const menu: { title: string; url: string }[] = [
		{ title: "Цвета", url: "/catalogs/colors" },
		{ title: "Материалы", url: "/catalogs/materials" },
	];
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Каталоги</NavigationMenuTrigger>
					<NavigationMenuContent>
						{menu.map((item) => (
							<NavigationMenuLink
								key={item.url}
								className="align-middle flex flex-row  cursor-pointer"
								onClick={() => {
									// navigate({ to: item.url });
								}}
							>
								<div>{item.title}</div>
							</NavigationMenuLink>
						))}
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
