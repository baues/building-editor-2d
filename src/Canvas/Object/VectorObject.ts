import p5 from 'p5';
import { Point, Vector } from 'building-editor-2d/Geometry';
import { GeometryObject } from "./GeometryObject";
import { PointObject } from './PointObject';
import { ObjectColor, SnapMode } from 'building-editor-2d/types';

export class VectorObject implements GeometryObject {
    /**オブジェクトが保持するジオメトリ情報 */
    geometry: Vector;
    /**オブジェクトの名前 */
    name: string;
    /**オブジェクトの所属するレイヤー名 */
    layerName: string;
    /**オブジェクトのタイプ情報 */
    objectType = "Vector";
    /**オブジェクト単体に対する可視化のブール値。これとは別に所属するレイヤーに対しても可視化のブール値がある */
    isVisible = true;
    /**オブジェクトが選択されているかのブール値 */
    isSelected = false;

    constructor(geometry: Vector, name = "", layerName = "default") {
        this.geometry = geometry;
        this.name = name;
        this.layerName = layerName;
    }

    draw(p5: p5, color: ObjectColor, scale: number, isFill = false, length = 1, weight = 1, origin = Point.zero()): void {
        const vec = this.geometry;

        p5.noFill();
        p5.stroke(color.stroke);
        p5.strokeWeight(weight / scale);

        const from = new Point(origin.x, origin.y);
        const to = new Point(vec.x * length + origin.x, vec.y * length + origin.y);
        p5.line(from.x, from.y, to.x, to.y);

        const arrow1 = vec.rotate(Math.PI * 5 / 6);
        const arrow2 = vec.rotate(Math.PI * 7 / 6);
        const aLength = length / 5;

        const aFrom = to;
        const aTo1 = new Point(arrow1.x * aLength + aFrom.x, arrow1.y * aLength + aFrom.y);
        const aTo2 = new Point(arrow2.x * aLength + aFrom.x, arrow2.y * aLength + aFrom.y);
        p5.line(aFrom.x, aFrom.y, aTo1.x, aTo1.y);
        p5.line(aFrom.x, aFrom.y, aTo2.x, aTo2.y);
    }

    /**
     * PointObject としての距離を返す
     */
    mouseDist(p5: p5, pan: Vector, scale: number): number {
        return new PointObject(this.geometry.toPoint()).mouseDist(p5, pan, scale);
    }

    /**
     * PointObject として snap は処理する
     */
    snap(p5: p5, snapMode: SnapMode, pan: Vector, scale: number): Point | null {
        return new PointObject(this.geometry.toPoint()).snap(p5, snapMode, pan, scale);
    }
}
