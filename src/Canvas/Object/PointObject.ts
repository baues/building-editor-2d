import p5 from 'p5';
import { Point, Vector } from "building-editor-2d/Geometry";
import { GeometryObject } from "./GeometryObject";
import { ObjectColor, SnapMode } from 'building-editor-2d/types';

export class PointObject implements GeometryObject {
    /**オブジェクトが保持するジオメトリ情報 */
    geometry: Point;
    /**オブジェクトの名前 */
    name: string;
    /**オブジェクトの所属するレイヤー名 */
    layerName: string;
    /**オブジェクトのタイプ情報 */
    objectType = "Point";
    /**オブジェクト単体に対する可視化のブール値。これとは別に所属するレイヤーに対しても可視化のブール値がある */
    isVisible = true;
    /**オブジェクトが選択されているかのブール値 */
    isSelected = false;

    constructor(geometry: Point, name = "", layerName = "default") {
        this.geometry = geometry;
        this.name = name;
        this.layerName = layerName;
    }

    snap(p5: p5, snapMode: SnapMode, pan: Vector, scale: number): Point | null {
        if (snapMode.near || snapMode.endPoint || snapMode.middle) {
            return this.snapNear(p5, pan, scale);
        } else {
            return null;
        }
    }

    snapNear(p5: p5, pan: Vector, scale: number, distance = 30): Point | null {
        const dist = this.mouseDist(p5, pan, scale);
        if (dist < distance / scale) {
            return this.geometry;
        } else {
            return null;
        }
    }

    static mousePt(p5: p5, pan: Vector, scale: number, layerName = "default"): PointObject {
        return new PointObject(new Point(p5.mouseX - pan.x, p5.mouseY - pan.y).divide(scale), "", layerName);
    }

    draw(p5: p5, color: ObjectColor, scale: number, isFill = false, diameter = 1, weight = 1): void {
        const pt = this.geometry;
        if (isFill) {
            p5.fill(color.fill);
        } else {
            p5.noFill();
        }
        p5.stroke(color.stroke);
        p5.strokeWeight(weight / scale);
        p5.circle(pt.x, pt.y, diameter / scale);
    }

    mouseDist(p5: p5, pan: Vector, scale: number): number {
        const pt = this.geometry;
        const mousePt = PointObject.mousePt(p5, pan, scale).geometry;
        return Math.sqrt((pt.x - mousePt.x) ** 2 + (pt.y - mousePt.y) ** 2);
    }
}
