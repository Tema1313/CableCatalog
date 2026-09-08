// import type { ICabel } from "@/shared/api/model"
// import { useState, type FC } from "react"

// interface ICreateNodeProps {
// 	isMainNode: boolean
// 	disabled?: boolean
// 	node?: ICabel
// }

// export const CreateNode: FC<ICreateNodeProps> = (props) => {
// 	const [open, setOpen] = useState<boolean>(false)
// 	const [typeOfElementId, setTypeOfElementId] = useState<number | null>(null)

// 	const currentTypeOfElement = typesOfElement?.data.find((typeOfElement) => typeOfElement.id === typeOfElementId)
// 	const currentTypeAlias = typeOfElementId ? getTypeOfNode(currentTypeOfElement?.alias) : null

// 	const FormComponent = props.isMainNode
// 		? Forms[TypeOfNodeAlias.MainNode]
// 		: currentTypeAlias
// 			? Forms[currentTypeAlias as TypeOfNodeAlias]
// 			: null

// 	const isLoading = isTypesOfElementFetching

// 	return (
// 		<Dialog
// 			modal
// 			open={open}
// 			onOpenChange={(open) => {
// 				setOpen(open)
// 				setTypeOfElementId(null)
// 			}}
// 		>
// 			<DialogTrigger className="cursor-pointer" asChild>
// 				<Button disabled={props.disabled} title={"Добавить"} variant="ghost" className=" green p-2">
// 					<Plus strokeWidth={4} size={24} color="#4082b7" />
// 				</Button>
// 			</DialogTrigger>

// 			<DialogContent className="max-h-dvh gap-2 overflow-auto">
// 				<DialogHeader>
// 					<DialogTitle>Добавить {props.isMainNode ? "кабель" : "элемент конструкции"}</DialogTitle>
// 					<DialogDescription />
// 				</DialogHeader>
// 				{isLoading ? (
// 					<div className="flex justify-center">
// 						<Loader2 className="m-2 h-10 w-10 animate-spin justify-center " />
// 					</div>
// 				) : (
// 					<>
// 						{!props.isMainNode && (
// 							<Select
// 								value={String(typeOfElementId) || ""}
// 								onValueChange={(value) => {
// 									setTypeOfElementId(Number(value))
// 								}}
// 							>
// 								<SelectTrigger className="w-full min-w-0 overflow-hidden">
// 									<SelectValue placeholder="Выберите элемент" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									{typesOfElement?.data.map((typeOfElement) => (
// 										<SelectItem key={typeOfElement.id} value={typeOfElement.id ? String(typeOfElement.id) : ""}>
// 											{typeOfElement.name}
// 										</SelectItem>
// 									))}
// 								</SelectContent>
// 							</Select>
// 						)}
// 						<div className="text-sm">
// 							{FormComponent && (
// 								<FormComponent
// 									onHide={() => {
// 										setOpen(false)
// 									}}
// 									parentNode={props.node}
// 									formMode={FormMode.Create}
// 									typeOfElement={currentTypeOfElement}
// 								/>
// 							)}
// 						</div>
// 					</>
// 				)}
// 			</DialogContent>
// 		</Dialog>
// 	)
// }
