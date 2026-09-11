import { Button } from "@/shared/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CatForm } from "./CatForm"

export const CreateCat = () => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<Dialog
			modal
			open={open}
			onOpenChange={(open) => {
				setOpen(open)
			}}
		>
			<DialogTrigger className="cursor-pointer" asChild>
				<Button title={"Добавить"} variant="ghost" className=" green p-2">
					<Plus strokeWidth={4} size={24} color="#4082b7" />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-h-dvh gap-2 overflow-auto">
				<DialogHeader>
					<DialogTitle>Добавить котика</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<CatForm mode="Create" />
			</DialogContent>
		</Dialog>
	)
}
