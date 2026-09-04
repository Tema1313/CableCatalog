import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableHeaderSortCell, TableRow } from "@/shared/components/ui/table"
import { TablePagination } from "@/shared/components/ui/table-pagination"
import type { IMaterial } from "@/shared/data/model"
import { materialsDTO } from "@/shared/data/testdata"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState } from "@tanstack/react-table"
import { Loader2, RefreshCcw, Trash } from "lucide-react"
import type { FC } from "react"
import React, { useEffect, useState } from "react"
import DateObject from "react-date-object"
import { CreateMaterial } from "./CreateMaterial"
import { Warning } from "@/shared/components/controls/warning"
import { toast } from "sonner"
import { UpdateMaterial } from "./UpdateMaterial"


interface IMaterialsProps { }

export const Materials: FC<IMaterialsProps> = (props) => {
	const [materials, setMaterials] = useState<IMaterial[]>([])
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	})
	const [loading, reqSim] = useRequestSimulation()

	useEffect(() => {
		reqSim(() => {
			setMaterials(materialsDTO)
		}, 2000)
	}, [])

	const columns: ColumnDef<IMaterial>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => <TableHeaderSortCell title="Материал" {...column} />,
		},
		{
			accessorKey: "comment",
			header: ({ column }) => <TableHeaderSortCell title="Комментарий" {...column} />,
		},
		{
			accessorKey: "date",
			header: ({ column }) => <TableHeaderSortCell title="Дата модификации" {...column} />,
			cell: ({ row }) => {
				return <div>{new DateObject(row.getValue<IMaterial["date"]>("date") || "").format("DD.MM.YYYY")}</div>
			},
		},
		{
			id: "update",
			enableHiding: false,
			cell: ({ row }) => <UpdateMaterial material={row.original} />,
		},
		{
			id: "delete",
			enableHiding: false,
			cell: ({ row }) => (
				<Warning actionClick={() => {
					reqSim(() => {
						console.log(row)
						toast("Technichal problems")
					})
				}} actionTitle="Удалить">
					<Button variant="link" className="cursor-pointer">
						<Trash className="ml-2 h-4 w-4 " color="red" />
					</Button>
				</Warning>
			),
		},
	]

	const table = useReactTable({
		data: materials,
		columns,
		state: {
			sorting,
			columnFilters,
			pagination,
		},
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<div className="m-4">
			<div className="flex justify-between content-center">
				<div className="mb-3 text-xl font-bold">Материалы</div>
				<div className="flex">
					<div>
						<Button
							onClick={() => {
								reqSim(() => {
									setMaterials(materialsDTO)
								}, 2000)
							}}
							size="sm"
							variant="ghost"
							className="ml-auto green cursor-pointer"
							title="Обновить"
						>
							<RefreshCcw color="#4082b7" />
						</Button>
					</div>
					<CreateMaterial />
				</div>
			</div>
			<div className="flex items-center pb-2 w-full">
				<Input
					className="w-full bg-card h-9"
					placeholder={"Поиск по наименованию"}
					onChange={(event) => {
						setColumnFilters(() => {
							return [{ id: "name", value: event.target.value }]
						})
						setPagination((prev) => ({
							...prev,
							pageIndex: 0,
						}))
					}}
				/>
			</div>
			{loading ? (
				<div className="flex justify-center">
					<Loader2 className="m-2 h-10 w-10 animate-spin justify-center " />
				</div>
			) : (
				<div className="w-full">
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
											<TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="h-[34px]">
												{row.getVisibleCells().map((cell) => (
													<TableCell className="py-[0px]" key={cell.id}>
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
						<TablePagination
							table={table}
							pageIndex={pagination.pageIndex}
							setPageIndex={(pageIndex) => {
								setPagination((prev) => ({
									...prev,
									pageIndex: pageIndex,
								}))
							}}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
