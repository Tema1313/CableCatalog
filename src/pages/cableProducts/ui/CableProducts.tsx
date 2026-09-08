import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useState, type FC } from "react"
import DateObject from "react-date-object"
import { useCableProductsStore } from "../model/cableProductsStore"
import { useUpdateCableProducts } from "../hooks/useUpdateCableProducts"
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type SortingState,
} from "@tanstack/react-table"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableHeaderSortCell,
	TableRow,
} from "@/shared/components/ui/table"
import type { ICable, ICableType, IColor, IMaterial } from "@/shared/api/model"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/ui/resizable"
import { Button } from "@/shared/components/ui/button"
import { Eraser, Loader2, RefreshCcw, X } from "lucide-react"
import { Warning } from "@/shared/components/controls/warning"
import { TablePagination } from "@/shared/components/ui/table-pagination"
import { CableProductDetailLayout } from "./detail/CableProductDetailLayout"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import { cableTypeDTO, colorsDTO, materialsDTO } from "@/shared/api/testdata"

interface ICableProductsProps {
	currentCableProductId?: number
}

export const CableProducts: FC<ICableProductsProps> = (props) => {
	const navigate = useNavigate({ from: "/" })
	const searchParams = useSearch({ from: "__root__" })
	const { cableProducts } = useCableProductsStore((store) => store)
	const { updateCableProductList, isLoading: isCableProsuctsLoading } = useUpdateCableProducts()
	const [loading, reqSim] = useRequestSimulation()

	const currentCableProduct = cableProducts.find((product) => product.id === props.currentCableProductId)
	const isLoading = isCableProsuctsLoading || loading

	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 15,
	})

	const [materialsList, setMaterialsList] = useState<IMaterial[]>([])
	const [colorsList, setColorsList] = useState<IColor[]>([])
	const [cableTypeList, setCableTypeList] = useState<ICableType[]>([])

	const columns: ColumnDef<ICable>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => <TableHeaderSortCell title="Наименование" {...column} />,
			cell: ({ row }) => {
				const value = row.getValue<ICable["name"]>("name")
				return (
					<div className="max-w-[200px]">
						<div title={value} className="overflow-hidden text-ellipsis">
							{value}
						</div>
					</div>
				)
			},
		},
		{
			accessorKey: "cableTypeId",
			header: ({ column }) => <TableHeaderSortCell title="Тип кабеля" {...column} />,
			cell: ({ row }) => {
				const value =
					cableTypeList.find((elem) => elem.id === row.getValue<ICable["cableTypeId"]>("cableTypeId"))?.name ||
					"Неизвестно"
				return <div>{value}</div>
			},
		},
		{
			accessorKey: "colorId",
			header: ({ column }) => <TableHeaderSortCell title="Цвет" {...column} />,
			cell: ({ row }) => {
				const value =
					colorsList.find((elem) => elem.id === row.getValue<ICable["colorId"]>("colorId"))?.name || "Неизвестно"
				return <div>{value}</div>
			},
		},
		{
			accessorKey: "materialId",
			header: ({ column }) => <TableHeaderSortCell title="Материал" {...column} />,
			cell: ({ row }) => {
				const value =
					materialsList.find((elem) => elem.id === row.getValue<ICable["materialId"]>("materialId"))?.name ||
					"Неизвестно"
				return <div>{value}</div>
			},
		},
		{
			accessorKey: "mass",
			header: ({ column }) => <TableHeaderSortCell title="Масса кабеля, кг" {...column} />,
		},
		{
			accessorKey: "cableProdName",
			header: ({ column }) => <TableHeaderSortCell title="Производитель" {...column} />,
		},
		{
			accessorKey: "shortName",
			header: ({ column }) => <TableHeaderSortCell title="Короткое наименование" {...column} />,
		},
		{
			accessorKey: "date",
			header: ({ column }) => <TableHeaderSortCell title="Дата модификации" {...column} />,
			cell: ({ row }) => {
				return <div>{new DateObject(row.getValue<ICable["date"]>("date") || "").format("DD.MM.YYYY")}</div>
			},
		},
	]

	const table = useReactTable({
		data: cableProducts,
		columns,
		state: {
			sorting,
			pagination,
		},
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	useEffect(() => {
		if (props.currentCableProductId && cableProducts.length !== 0) {
			const rows = table.getSortedRowModel().rows
			const idx = rows.findIndex((row) => row.original.id === props.currentCableProductId)
			if (idx !== -1) {
				const pageIndex = Math.floor(idx / pagination.pageSize)
				setPagination((prev) => (prev.pageIndex === pageIndex ? prev : { ...prev, pageIndex }))
			} else {
				setPagination((prev) => ({ ...prev, pageIndex: 0 }))
				navigate({
					to: "/",
					search: (prev) => prev,
				})
			}
		}
	}, [props.currentCableProductId, cableProducts])

	useEffect(() => {
		updateCableProductList()
	}, [searchParams])

	useEffect(() => {
		reqSim(() => {
			setMaterialsList(materialsDTO)
			setColorsList(colorsDTO)
			setCableTypeList(cableTypeDTO)
		}, 1500)
	}, [])

	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel defaultSize={props.currentCableProductId ? 20 : 100}>
				<div className="m-4">
					<div className="flex justify-between">
						<div className="mb-3 text-xl font-bold">Кабельная продукция</div>
						<div className="flex">
							<Button
								variant="ghost"
								className="cursor-pointer p-2"
								title="Очистить фильтр"
								onClick={() => {
									navigate({
										search: () => ({
											cableTypeId: undefined,
											colorId: undefined,
											materialId: undefined,
											name: undefined,
											shortName: undefined,
										}),
									})
								}}
							>
								<Eraser color="#f7bb88" />
							</Button>
							{/* <CreateNode isMainNode={true} /> */}
							<Warning actionClick={() => {}} description="Вывести марку кабеля из использования?" actionTitle="Да">
								<Button disabled={!currentCableProduct} title="Удалить" variant="ghost" className="cursor-pointer p-2">
									<X color="red" strokeWidth={4} />
								</Button>
							</Warning>
							<Button
								onClick={() => {
									updateCableProductList()
								}}
								variant="ghost"
								title="Обновить"
								className="ml-auto green cursor-pointer p-2"
							>
								<RefreshCcw color="#4082b7" />
							</Button>
						</div>
					</div>
					{isLoading ? (
						<div className="flex justify-center">
							<Loader2 className="m-2 h-10 w-10 animate-spin justify-center " />
						</div>
					) : (
						<div>
							<div className="overflow-hidden rounded-md border">
								<Table>
									<TableHeader>
										{table.getHeaderGroups().map((headerGroup) => (
											<TableRow key={headerGroup.id}>
												{headerGroup.headers.map((header) => {
													return (
														<TableHead key={header.id}>
															{header.isPlaceholder
																? null
																: flexRender(header.column.columnDef.header, header.getContext())}
														</TableHead>
													)
												})}
											</TableRow>
										))}
									</TableHeader>
									<TableBody>
										{table.getRowModel().rows?.length ? (
											table.getRowModel().rows.map((row) => (
												<TableRow
													onClick={() => {
														navigate({
															to: "/cableProduct/$cableProductId",
															params: {
																cableProductId: String(row.original.id!),
															},
															search: (prev) => prev,
														})
													}}
													key={row.id}
													data-state={row.getIsSelected() && "selected"}
													className={`${
														row.original.id === props.currentCableProductId ? "bg-sky-300" : ""
													} h-[30px] cursor-pointer `}
												>
													{row.getVisibleCells().map((cell) => (
														<TableCell key={cell.id}>
															{flexRender(cell.column.columnDef.cell, cell.getContext())}
														</TableCell>
													))}
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={columns.length} className="h-24 text-center">
													Нет данных
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</div>
							<div className="flex justify-between justify-items-center flex-wrap-reverse">
								<div className="mt-4">Ограничение: 15</div>
								<TablePagination
									table={table}
									pageIndex={pagination.pageIndex}
									setPageIndex={(pageIndex) => {
										setPagination((prev) => ({
											...prev,
											pageIndex: pageIndex,
										}))
									}}
									countElemements={cableProducts.length}
								/>
							</div>
						</div>
					)}
				</div>
			</ResizablePanel>
			{props.currentCableProductId && (
				<>
					<ResizableHandle />
					<ResizablePanel defaultSize={80} className="relative flex flex-col">
						<CableProductDetailLayout
						// cloneCount={currentCableProduct?.cloneCount || 0}
						// currentCableProductId={props.currentCableProductId}
						/>
					</ResizablePanel>
				</>
			)}
		</ResizablePanelGroup>
	)
}
