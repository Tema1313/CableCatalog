import type { ICable } from "@/shared/api/model"
import { cablesDTO } from "@/shared/api/testdata"

interface IGetCableProductsProps {
    colorId?: number
    materialId?: number
    shortName?: string
    cableType?: number
    name?: string
}

export const getCableProducts = (props: IGetCableProductsProps): ICable[] => {
    const { colorId, materialId, shortName, cableType, name } = props
    return cablesDTO.filter(cable => {
        if (colorId !== undefined && cable.colorId !== colorId) return false
        if (materialId !== undefined && cable.materialId !== materialId) return false
        if (cableType !== undefined && cable.cableTypeId !== cableType) return false
        if (name && !cable.name?.includes(name)) return false
        if (shortName && !cable.shortName?.includes(shortName)) return false
        return true;
    });
}