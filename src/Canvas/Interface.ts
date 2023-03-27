import { Point, Vector } from '../Geometry';
import { ObjectColor } from '../types';
import p5 from 'p5';
import { Layer } from './Layer';
import { GeometryObject } from './Object/GeometryObject';

/**
 * UUID を持つオブジェクトのインターフェース
 * これを継承することで、UUID を持つオブジェクトを作成できる
 */
export interface UUID {
    UUID: string;
}

export interface ActionState extends UUID {
    UUID: string;
    action: string;
    type: string;
    item: Layer | GeometryObject | null;
}

/**
 * 描画可能オブジェクトのインターフェース
 */
export interface DrawableObject extends UUID {
    isVisible: boolean;
    draw(p5: p5, objectColor: ObjectColor, scale: number, isFill: boolean): void;
}

/**
 * ポイントのスナップに関するのインターフェース
 */
export interface PointSnap {
    snapNear(p5: p5, pan: Vector, distance: number): Point | null;
}

/**
 * カーブのスナップに関するのインターフェース
 */
export interface CurveSnap extends PointSnap {
    snapNear(p5: p5, pan: Vector, distance: number): Point | null;
    snapMiddle(p5: p5, pan: Vector, distance: number): Point | null;
    snapEndPoint(p5: p5, pan: Vector, distance: number): Point | null;
}
