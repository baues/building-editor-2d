import { Vector, GeometryBase, Point } from 'building-editor-2d/Geometry';
import { ObjectColor, SnapMode } from 'building-editor-2d/types';
import p5 from 'p5';
import { DrawableObject } from '../Interface';

/**
 * ジオメトリオブジェクトのインターフェース
 */
export interface GeometryObject extends DrawableObject {
    /**オブジェクトが保持するジオメトリ情報 */
    geometry: GeometryBase;
    /**オブジェクトの名前 */
    name: string;
    /**オブジェクトの所属するレイヤー名 */
    objectType: string;
    /**オブジェクトのタイプ情報 */
    layerName: string;
    /**オブジェクト単体に対する可視化のブール値。これとは別に所属するレイヤーに対しても可視化のブール値がある */
    isVisible: boolean;
    /**オブジェクトが選択されているかのブール値 */
    isSelected: boolean;

    draw(p5: p5, objectColor: ObjectColor, scale: number, isFill: boolean): void;
    snap(p5: p5, snapMode: SnapMode, pan: Vector, scale: number): Point | null;
    mouseDist(p5: p5, pan: Vector, scale: number): number;
}
