import type { FC } from "react";
import { CatalogNavigation } from "./CatalogNavigation";
import { ProfileNavigation } from "./ProfileNavigation";

interface INavigationProps {}

export const Navigation: FC<INavigationProps> = (props) => {
	return (
		<div className="ms-auto flex gap-4 items-center">
			{/* ссылка на домашнюю страницу */}
			<CatalogNavigation />
			<ProfileNavigation />
		</div>
	);
};
