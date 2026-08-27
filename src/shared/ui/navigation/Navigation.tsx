import type { FC } from "react";
import { CatalogNavigayion } from "./CatalogNavigayion";
import { ProfileNavigation } from "./ProfileNavigation";

interface INavigationProps {}

export const Navigation: FC<INavigationProps> = (props) => {
	return (
		<div className="ms-auto flex gap-4 items-center">
			{/* ссылка на домашнюю страницу */}
			<CatalogNavigayion />
			<ProfileNavigation />
		</div>
	);
};
