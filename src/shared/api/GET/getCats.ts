import type { ICat } from "../model"
import { cats } from "../testdata"

interface IGetCatsProps {
    colorId?: number
    shortName?: string
    name?: string
    catTypeId?: number
    breedId?: number
    coatId?: number
}

export const getCats = (props: IGetCatsProps): ICat[] => {
    const { colorId, shortName, name, breedId, catTypeId, coatId } = props
    return cats.filter(cat => {
        if (colorId !== undefined && cat.colorId !== colorId) return false
        if (breedId !== undefined && cat.breedTypeId !== breedId) return false
        if (catTypeId !== undefined && cat.locationTypeId !== catTypeId) return false
        if (coatId !== undefined && cat.coatTypeId !== coatId) return false
        if (name && !cat.name?.includes(name)) return false
        if (shortName && !cat.shortName?.includes(shortName)) return false
        return true;
    });
}