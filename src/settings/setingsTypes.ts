export interface Stage {
    readonly width: number,
    readonly height: number,
    readonly backgroundColor: number,
    readonly preserveDrawingBuffer: boolean,
    readonly [propName: string]: number | boolean | string
}
export interface TextStyle {
    readonly [propName: string]: number | boolean | string
}

export interface ReelSettings {
    readonly totalCount: number,
    readonly width: number,
    readonly symbolSize: number,
    readonly blurMultiplier: number,
    readonly margin: number,
}
