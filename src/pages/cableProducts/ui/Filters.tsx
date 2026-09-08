import { Button } from "@/shared/components/ui/button"
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/shared/components/ui/combobox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import type { ICableType, IColor, IMaterial } from "@/shared/api/model"
import { cableTypeDTO, colorsDTO, materialsDTO } from "@/shared/api/testdata"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useState, type FC } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

interface IFiltersProps {}

export const FiltersSchema = z.object({
	name: z.string().optional().catch(undefined),
	cableTypeId: z.union([z.string(), z.number()]).optional(),
	shortName: z.string().optional().catch(undefined),
	colorId: z.union([z.string(), z.number()]).optional(),
	materialId: z.union([z.string(), z.number()]).optional(),
})

export type FilterFormData = z.infer<typeof FiltersSchema>

export const Filters: FC<IFiltersProps> = (props) => {
	const [, reqSim] = useRequestSimulation()
	const searchParams = useSearch({ from: "__root__" })
	const navigate = useNavigate({ from: "/" })

	const [search, setSearch] = useState<{
		color: string
		cableType: string
		material: string
	}>({
		color: "",
		cableType: "",
		material: "",
	})
	const [materialsList, setMaterialsList] = useState<IMaterial[]>([])
	const [colorsList, setColorsList] = useState<IColor[]>([])
	const [cableTypeList, setCableTypeList] = useState<ICableType[]>([])

	const materials: IMaterial[] = [{ id: -1, name: "Все" }, ...materialsList]
	const colors: IColor[] = [{ id: -1, name: "Все" }, ...colorsList]
	const cableTypes: ICableType[] = [{ id: -1, name: "Все" }, ...cableTypeList]

	const form = useForm<FilterFormData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(FiltersSchema),
		defaultValues: {
			name: searchParams.name ? searchParams.name : "",
			cableTypeId: searchParams.cableTypeId !== undefined ? String(searchParams.cableTypeId) : "-1",
			colorId: searchParams.colorId !== undefined ? String(searchParams.colorId) : "-1",
			materialId: searchParams.materialId !== undefined ? String(searchParams.materialId) : "-1",
			shortName: searchParams.shortName ? searchParams.shortName : "",
		},
	})

	const onSubmit = (data: FilterFormData) => {
		navigate({
			search: () => ({
				materialId: data.materialId !== "-1" ? Number(data.materialId) : undefined,
				colorId: data.colorId !== "-1" ? Number(data.colorId) : undefined,
				name: data.name ? data.name : undefined,
				shortName: data.shortName ? data.shortName : undefined,
				cableTypeId: data.cableTypeId !== "-1" ? Number(data.cableTypeId) : undefined,
			}),
		})
	}

	useEffect(() => {
		reqSim(() => {
			setMaterialsList(materialsDTO)
			setColorsList(colorsDTO)
			setCableTypeList(cableTypeDTO)
		})
	}, [])

	useEffect(() => {
		form.reset({
			cableTypeId: searchParams.cableTypeId !== undefined ? String(searchParams.cableTypeId) : "-1",
			shortName: searchParams.shortName ? searchParams.shortName : "",
			name: searchParams.name ? searchParams.name : "",
			materialId: searchParams.materialId !== undefined ? String(searchParams.materialId) : "-1",
			colorId: searchParams.colorId !== undefined ? String(searchParams.colorId) : "-1",
		})
	}, [searchParams])

	return (
		<div className="mx-2 my-4">
			<Form {...form}>
				<form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Наименование</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="shortName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Короткое наименование</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="colorId"
						control={form.control}
						render={({ field }) => {
							const selectedColor =
								field.value === "-1"
									? { id: "-1", name: "Все" }
									: colors.find((color) => String(color.id) === String(field.value))

							return (
								<FormItem className="w-full min-w-0">
									<FormLabel>Цвет</FormLabel>

									<Combobox
										value={field.value ? String(field.value) : undefined}
										onValueChange={(val) => {
											field.onChange(val)
											setSearch((prev) => ({
												...prev,
												color: "",
											}))
										}}
										items={colors}
									>
										<ComboboxInput
											value={search.color || selectedColor?.name || ""}
											onChange={(e) =>
												setSearch((prev) => ({
													...prev,
													color: e.target.value,
												}))
											}
											onBlur={(e) => {
												setSearch((prev) => ({
													...prev,
													color: "",
												}))
												if (!e.target.value) {
													field.onChange("-1")
												}
											}}
										/>

										<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
											<ComboboxEmpty>Элементы не найдены</ComboboxEmpty>

											<ComboboxList>
												{(item: IColor) => (
													<ComboboxItem
														key={item.id}
														value={String(item.id)}
														onSelect={() => {
															field.onChange(String(item.id))
															setSearch((prev) => ({
																...prev,
																color: "",
															}))
														}}
														data-selected={String(item.id) === String(field.value)}
													>
														{item.name}
													</ComboboxItem>
												)}
											</ComboboxList>
										</ComboboxContent>
									</Combobox>

									<FormMessage />
								</FormItem>
							)
						}}
					/>
					<FormField
						name="materialId"
						control={form.control}
						render={({ field }) => {
							const selectedMaterial =
								field.value === "-1"
									? { id: "-1", name: "Все" }
									: materials.find((material) => String(material.id) === String(field.value))

							return (
								<FormItem>
									<FormLabel>Материал</FormLabel>
									<Combobox
										value={field.value ? String(field.value) : undefined}
										onValueChange={(val) => {
											field.onChange(val)
											setSearch((prev) => ({
												...prev,
												material: "",
											}))
										}}
										items={materials}
									>
										<ComboboxInput
											value={search.material || selectedMaterial?.name || ""}
											onChange={(e) =>
												setSearch((prev) => ({
													...prev,
													material: e.target.value,
												}))
											}
											onBlur={(e) => {
												setSearch((prev) => ({
													...prev,
													material: "",
												}))
												if (!e.target.value) {
													field.onChange("-1")
												}
											}}
										/>

										<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
											<ComboboxEmpty>Элементы не найдены</ComboboxEmpty>

											<ComboboxList>
												{(item: IMaterial) => (
													<ComboboxItem
														key={item.id}
														value={String(item.id)}
														onSelect={() => {
															field.onChange(String(item.id))
															setSearch((prev) => ({
																...prev,
																material: "",
															}))
														}}
														data-selected={String(item.id) === String(field.value)}
													>
														{item.name}
													</ComboboxItem>
												)}
											</ComboboxList>
										</ComboboxContent>
									</Combobox>

									<FormMessage />
								</FormItem>
							)
						}}
					/>
					<FormField
						name="cableTypeId"
						control={form.control}
						render={({ field }) => {
							const selectedCableType =
								field.value === "-1"
									? { id: "-1", name: "Все" }
									: cableTypes.find((cableType) => String(cableType.id) === String(field.value))

							return (
								<FormItem>
									<FormLabel>Тип</FormLabel>
									<Combobox
										value={field.value ? String(field.value) : undefined}
										onValueChange={(val) => {
											field.onChange(val)
											setSearch((prev) => ({
												...prev,
												cableType: "",
											}))
										}}
										items={cableTypes}
									>
										<ComboboxInput
											value={search.cableType || selectedCableType?.name || ""}
											onChange={(e) =>
												setSearch((prev) => ({
													...prev,
													cableType: e.target.value,
												}))
											}
											onBlur={(e) => {
												setSearch((prev) => ({
													...prev,
													cableType: "",
												}))
												if (!e.target.value) {
													field.onChange("-1")
												}
											}}
										/>

										<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
											<ComboboxEmpty>Элементы не найдены</ComboboxEmpty>

											<ComboboxList>
												{(item: ICableType) => (
													<ComboboxItem
														key={item.id}
														value={String(item.id)}
														onSelect={() => {
															field.onChange(String(item.id))
															setSearch((prev) => ({
																...prev,
																cableType: "",
															}))
														}}
														data-selected={String(item.id) === String(field.value)}
													>
														{item.name}
													</ComboboxItem>
												)}
											</ComboboxList>
										</ComboboxContent>
									</Combobox>

									<FormMessage />
								</FormItem>
							)
						}}
					/>
					<Button type="submit" className="w-full">
						Применить
					</Button>
				</form>
			</Form>
		</div>
	)
}
