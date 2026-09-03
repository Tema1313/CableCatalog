interface IColor {
    name: string
    grb: string
    comment: string
    date: string
}

interface IMaterial {
    name: string
    comment: string
    date: string
}

interface RgbColor {
    r: number;
    g: number;
    b: number;
}

export type { IColor, IMaterial, RgbColor }