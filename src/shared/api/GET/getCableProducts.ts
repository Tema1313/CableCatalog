import type { ICabel } from "@/shared/api/model"
import { cabelsDTO } from "@/shared/api/testdata"

interface IGetCableProductsProps {
    colorId?: number
    materialId?: number
    shortName?: string
    cableType?: string
    name?: string
}

export const getCableProducts = (props: IGetCableProductsProps): ICabel[] => {
    const { colorId, materialId, shortName, cableType, name } = props

    return cabelsDTO.filter(cabel => {
        if (colorId !== undefined && cabel.colorId !== colorId) return false
        if (materialId !== undefined && cabel.materialId !== materialId) return false
        if (cableType !== undefined && cabel.cableType !== cableType) return false
        if (name && !cabel.name.includes(name)) return false
        if (shortName && !cabel.shortName.includes(shortName)) return false

        return true;
    });
}