interface IColor {
    id?: number
    name?: string
    grb?: string
    comment?: string
    date?: string
}

interface IMaterial {
    id?: number
    name?: string
    comment?: string
    date?: string
}

interface ICableType {
    id?: number
    name?: string
}

interface RgbColor {
    r: number;
    g: number;
    b: number;
}

interface ICable {
    id?: number
    name?: string
    shortName?: string
    cableTypeId?: number
    cableProdName?: string
    mass?: number
    date?: string
    colorId?: number
    materialId?: number
}

export type { IColor, IMaterial, RgbColor, ICable, ICableType }