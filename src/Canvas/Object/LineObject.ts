import p5 from 'p5';
import { Vector, Point, Line } from '../../Geometry';
import { CurveSnap } from "../Interface";
import { GeometryObject } from "./GeometryObject";
import { ObjectColor, SnapMode } from '../../types';
import { PointObject } from './PointObject';
import { CreateUUID } from '../../Utils/UUID';

export class LineObject implements GeometryObject, CurveSnap {
    /**オブジェクトが保持するジオメトリ情報 */
    geometry: Line;
    /**オブジェクトの名前 */
    name: string;
    /**オブジェクトの所属するレイヤー名 */
    layerName: string;
    /**オブジェクトのタイプ情報 */
    objectType = "line";
    /**オブジェクト単体に対する可視化のブール値。これとは別に所属するレイヤーに対しても可視化のブール値がある */
    isVisible = true;
    /**オブジェクトが選択されているかのブール値 */
    isSelected = false;
    /**オブジェクトの UUID */
    UUID: string = CreateUUID();

    constructor(geometry: Line, name = "", layerName = "default") {
        this.geometry = geometry;
        this.name = name;
        this.layerName = layerName;
    }

    draw(p5: p5, color: ObjectColor, scale: number, isFill = false, weight = 1): void {
        const line = this.geometry;
        p5.stroke(color.stroke);
        p5.strokeWeight(weight / scale);
        p5.line(line.from.x, line.from.y, line.to.x, line.to.y);
    }

    /**
     * マウスのポイントと Line との距離を求める。
     * @param p5
     * @param pan
     * @param scale
     * @returns
     */
    mouseDist(p5: p5, pan: Vector, scale: number): number {
        const mousePt: Point = PointObject.mousePt(p5, pan, scale).geometry;
        return this.geometry.distance(mousePt);
    }

    mouseClosestPoint(p5: p5, pan: Vector, scale: number): Point {
        const mousePt: Point = PointObject.mousePt(p5, pan, scale).geometry;
        return this.geometry.closestPoint(mousePt);
    }

    snap(p5: p5, snapMode: SnapMode, pan: Vector, scale: number): Point | null {
        let pt: Point | null = null;
        if (snapMode.near) {
            const snapPt = this.snapNear(p5, pan, scale);
            pt = snapPt ? snapPt : pt;
        }
        if (snapMode.endPoint) {
            const snapPt = this.snapEndPoint(p5, pan, scale);
            pt = snapPt ? snapPt : pt;
        }
        if (snapMode.middle) {
            const snapPt = this.snapMiddle(p5, pan, scale);
            pt = snapPt ? snapPt : pt;
        }
        return pt;
    }

    snapNear(p5: p5, pan: Vector, scale: number, distance = 50): Point | null {
        const line = this.geometry;
        const mousePt = PointObject.mousePt(p5, pan, scale).geometry;

        if (line.distance(mousePt) < distance / scale) {
            return line.closestPoint(mousePt);
        } else {
            return null;
        }
    }

    snapMiddle(p5: p5, pan: Vector, scale: number, distance = 30): Point | null {
        const line = this.geometry;
        const mousePt = PointObject.mousePt(p5, pan, scale).geometry;
        const center = line.middle();
        const dist = mousePt.distance(center);

        if (dist < distance / scale) {
            return center;
        } else {
            return null;
        }
    }

    snapEndPoint(p5: p5, pan: Vector, scale: number, distance = 30): Point | null {
        const line = this.geometry;
        const mousePt = PointObject.mousePt(p5, pan, scale).geometry;
        const fromDist = mousePt.distance(line.from);
        const toDist = mousePt.distance(line.to);

        const minDist = Math.min(fromDist, toDist);
        const minPt = fromDist < toDist ? line.from : line.to;

        if (minDist < distance / scale) {
            return minPt;
        } else {
            return null;
        }
    }
}
