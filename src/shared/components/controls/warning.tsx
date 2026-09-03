import type { FC, PropsWithChildren } from "react"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog"

interface IWarningProps {
	actionClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	cancelClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	actionTitle?: string
	description?: string
}

export const Warning: FC<PropsWithChildren<IWarningProps>> = (props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{"Вы уверены?"}</AlertDialogTitle>
					<AlertDialogDescription>
						{props.description !== undefined ? props.description : "Это действие нельзя отменить"}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={props.cancelClick}>{"Отменить"}</AlertDialogCancel>
					<AlertDialogAction onClick={props.actionClick}>
						{props.actionTitle ? props.actionTitle : "Сохранить"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
