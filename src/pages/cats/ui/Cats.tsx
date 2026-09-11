import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useState, type FC } from "react"
import DateObject from "react-date-object"
import { useCatsStore } from "../model/catsStore"
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
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/ui/resizable"
import { Button } from "@/shared/components/ui/button"
import { Eraser, Loader2, RefreshCcw, X } from "lucide-react"
import { Warning } from "@/shared/components/controls/warning"
import { TablePagination } from "@/shared/components/ui/table-pagination"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import type { ICat, ICatBreedType, ICatLocationType, ICoatType, IColor } from "@/shared/api/model"
import { catBreeds, catCoatTypes, catColors, catLocationType } from "@/shared/api/testdata"
import { CatPersonalInfoLayout } from "./cat-personal-info/CatPersonalInfoLayout"
import catBread from "@assets/bread-icons/catbread.png"
import catNotBread from "@assets/bread-icons/catnobread.png"
import { CreateCat } from "./CreateCat"

interface ICableProductsProps {
	catId?: number
}

export const Cats: FC<ICableProductsProps> = (props) => {
	const navigate = useNavigate({ from: "/" })
	const searchParams = useSearch({ from: "__root__" })
	const { cats: cableProducts } = useCatsStore((store) => store)
	const { updateCableProductList, isLoading: isCableProsuctsLoading } = useUpdateCableProducts()
	const [loading, reqSim] = useRequestSimulation()

	const currentCableProduct = cableProducts.find((product) => product.id === props.catId)
	const isLoading = isCableProsuctsLoading || loading

	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 15,
	})

	const [breedsList, setBreedsList] = useState<ICatBreedType[]>([])
	const [colorsList, setColorsList] = useState<IColor[]>([])
	const [catsTypeList, setCatsTypeList] = useState<ICatLocationType[]>([])
	const [coatsList, setCoatsList] = useState<ICoatType[]>([])

	const columns: ColumnDef<ICat>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => <TableHeaderSortCell title="Имя" {...column} />,
			cell: ({ row }) => {
				const value = row.getValue<ICat["name"]>("name")
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
			accessorKey: "shortName",
			header: ({ column }) => <TableHeaderSortCell title="Короткое имя" {...column} />,
		},
		{
			accessorKey: "locationTypeId",
			header: ({ column }) => <TableHeaderSortCell title="Тип котика" {...column} />,
			cell: ({ row }) => {
				const value =
					catsTypeList.find((elem) => elem.id === row.getValue<ICat["locationTypeId"]>("locationTypeId"))?.name ||
					"Неизвестно"
				return <div>{value}</div>
			},
		},
		{
			accessorKey: "colorId",
			header: ({ column }) => <TableHeaderSortCell title="Цвет" {...column} />,
			cell: ({ row }) => {
				const value =
					colorsList.find((elem) => elem.id === row.getValue<ICat["colorId"]>("colorId"))?.name || "Неизвестно"
				return <div>{value}</div>
			},
		},
		{
			accessorKey: "coatTypeId",
			header: ({ column }) => <TableHeaderSortCell title="Тип шерстки" {...column} />,
			cell: ({ row }) => {
				const value =
					coatsList.find((elem) => elem.id === row.getValue<ICat["coatTypeId"]>("coatTypeId"))?.name || "Неизвестно"
				return <div>{value}</div>
			},
		},
		{
			accessorKey: "breedTypeId",
			header: ({ column }) => <TableHeaderSortCell title="Порода" {...column} />,
			cell: ({ row }) => {
				const value =
					breedsList.find((elem) => elem.id === row.getValue<ICat["breedTypeId"]>("breedTypeId"))?.name || "Неизвестно"
				return <div>{value}</div>
			},
		},
		{
			accessorKey: "mass",
			header: ({ column }) => <TableHeaderSortCell title="Вес котика" {...column} />,
		},
		{
			accessorKey: "owner",
			header: ({ column }) => <TableHeaderSortCell title="Слуга котика" {...column} />,
		},
		{
			accessorKey: "bigeyedness",
			header: ({ column }) => <TableHeaderSortCell title="Большеглазость(от 1 до 10)" {...column} />,
		},
		{
			accessorKey: "breadness",
			header: ({ column }) => <TableHeaderSortCell title="Хлебобулочность" {...column} />,
			cell: ({ row }) => {
				const isBread = row.getValue<ICat["breadness"]>("breadness")
				return (
					<div className="flex ">
						<img src={isBread ? catBread : catNotBread} alt="catbread" className="w-[25px] h-[25px]" />
					</div>
				)
			},
		},
		{
			accessorKey: "softness",
			header: ({ column }) => <TableHeaderSortCell title="Мягкость" {...column} />,
		},
		{
			accessorKey: "date",
			header: ({ column }) => <TableHeaderSortCell title="Дата рождения" {...column} />,
			cell: ({ row }) => {
				return <div>{new DateObject(row.getValue<ICat["date"]>("date") || "").format("DD.MM.YYYY")}</div>
			},
		},
		{
			accessorKey: "stars",
			header: ({ column }) => <TableHeaderSortCell title="Рейтинг" {...column} />,
			cell: ({ row }) => {
				const stars = Array.from({ length: row.getValue<ICat["stars"]>("stars") || 5 }, (_, index) => (
					<span key={index}>⭐</span>
				))
				return <div className="flex">{stars}</div>
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
		if (props.catId && cableProducts.length !== 0) {
			const rows = table.getSortedRowModel().rows
			const idx = rows.findIndex((row) => row.original.id === props.catId)
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
	}, [props.catId, cableProducts])

	useEffect(() => {
		updateCableProductList()
	}, [searchParams])

	useEffect(() => {
		reqSim(() => {
			setBreedsList(catBreeds)
			setColorsList(catColors)
			setCatsTypeList(catLocationType)
			setCoatsList(catCoatTypes)
		}, 1500)
	}, [])

	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel defaultSize={props.catId ? 40 : 100}>
				<div className="m-4">
					<div className="flex justify-between">
						<div className="mb-3 text-xl font-bold">Котеечная продукция</div>
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
							<CreateCat />
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
															to: "/cat/$catId",
															params: {
																catId: String(row.original.id!),
															},
															search: (prev) => prev,
														})
													}}
													key={row.id}
													data-state={row.getIsSelected() && "selected"}
													className={`${row.original.id === props.catId ? "bg-sky-300" : ""} h-[30px] cursor-pointer `}
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
													Нет котиков
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
			{props.catId && (
				<>
					<ResizableHandle />
					<ResizablePanel defaultSize={60} className="relative flex flex-col">
						<CatPersonalInfoLayout catId={props.catId} />
					</ResizablePanel>
				</>
			)}
		</ResizablePanelGroup>
	)
}
