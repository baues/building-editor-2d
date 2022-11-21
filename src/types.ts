import { Point } from "./Geometry";

/**
 * y = ax + b のとなる各係数
 */
export type LineCoefficient = {
    a: number;
    b: number;
};

/**
 * カラーモードごとの色情報
 */
export type ObjectColorSet = {
    name: string;
    default: ObjectColor
    select: ObjectColor
    axis: ObjectColor
    grid: ObjectColor
    scaleBar: ObjectColor
    orientation: ObjectColor
};

/**
 * objectのstrokeとfillの色情報
 */
export type ObjectColor = {
    stroke: string;
    fill: string;
}

/**
 * スナップのモード、スナップ点、スナップされたオブジェクトのインデックスを保持するタイプ
 */
export type Snap = {
    mode: SnapMode
    point: Point | null;
    holdPoint: Point | null;
    objectIndex: number | null;
};

/**
 * 各スナップモードのブール値
 */
export type SnapMode = {
    endPoint: boolean,
    near: boolean,
    middle: boolean,
    angle: boolean,
    grid: boolean,
}
