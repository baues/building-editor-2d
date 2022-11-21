import p5 from 'p5';
import { CurveSnap } from "../Interface";
import { GeometryObject } from "./GeometryObject";
import { Point, Polyline, Vector } from 'building-editor-2d/Geometry';
import { LineObject } from 'building-editor-2d/Canvas/Object';
import { ObjectColor, SnapMode } from 'building-editor-2d/types';
import { PointObject } from './PointObject';
import { AnalysisPoint } from 'types';

/**
 * 2D のポリラインオブジェクトを表すクラス
 */
export class PolylineObject implements GeometryObject, CurveSnap {
    /**オブジェクトが保持するジオメトリ情報 */
    geometry: Polyline;
    /**オブジェクトの名前 */
    name: string;
    /**オブジェクトの所属するレイヤー名 */
    layerName: string;
    /**オブジェクトのタイプ情報 */
    objectType = "Polyline";
    /**オブジェクト単体に対する可視化のブール値。これとは別に所属するレイヤーに対しても可視化のブール値がある */
    isVisible = true;
    /**オブジェクトが選択されているかのブール値 */
    isSelected = false;

    constructor(geometry: Polyline, name = "", layerName = "default") {
        this.geometry = geometry;
        this.name = name;
        this.layerName = layerName;
    }

    toLineObjects(): LineObject[] {
        return this.geometry.toLineArray().map(line => new LineObject(line));
    }

    toPointObjects(): PointObject[] {
        return this.geometry.ptList.map(pt => new PointObject(pt));
    }

    toAnalysisPointArray(): AnalysisPoint[] {
        return this.geometry.toPointArray().map(pt => [pt.x, pt.y]);
    }

    draw(p5: p5, color: ObjectColor, scale: number, isFill = false): void {
        const ptList = this.geometry.toPointArray();

        p5.stroke(color.stroke);
        p5.strokeWeight(2.0 / scale);
        if (isFill) {
            p5.fill(color.fill);
            p5.beginShape();
            for (const pt of ptList) {
                p5.vertex(pt.x, pt.y);
            }
            if (this.geometry.isClosed) {
                p5.vertex(ptList[0].x, ptList[0].y);
            }
            p5.endShape(p5.CLOSE);
        } else {
            for (let i = 0; i < ptList.length - 1; i++) {
                p5.line(
                    ptList[i].x, ptList[i].y,
                    ptList[i + 1].x, ptList[i + 1].y,
                );
            }
            if (this.geometry.isClosed) {
                p5.line(
                    ptList[ptList.length - 1].x, ptList[ptList.length - 1].y,
                    ptList[0].x, ptList[0].y,
                );
            }
        }
    }

    mouseDist(p5: p5, pan = Vector.zero(), scale: number): number {
        let dist: number = Number.MAX_VALUE;

        this.toLineObjects().forEach((lineObj) => {
            const d = lineObj.mouseDist(p5, pan, scale);
            if (d < dist) {
                dist = d;
            }
        });

        if (dist === Number.MAX_VALUE){
            return Number.NaN;
        } else {
            return dist;
        }
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
        const snapPts = this.toLineObjects().map((lineObj) => {
            return lineObj.snapNear(p5, pan, scale, distance);
        });
        const snapDist = snapPts.map((pt) => {
            return pt?.distance(PointObject.mousePt(p5, pan, scale).geometry);
        });

        const index = this.getSnapPtIndex(snapDist);
        if (index >= 0) {
            return snapPts[index];
        } else {
            return null;
        }
    }

    snapMiddle(p5: p5, pan: Vector, scale: number, distance = 30): Point | null {
        const snapPts = this.toLineObjects().map((lineObj) => {
            return new PointObject(lineObj.geometry.middle()).snapNear(p5, pan, scale, distance);
        });
        const snapDist = snapPts.map((pt) => {
            return pt?.distance(PointObject.mousePt(p5, pan, scale).geometry);
        });

        const index = this.getSnapPtIndex(snapDist);
        if (index >= 0) {
            return snapPts[index];
        } else {
            return null;
        }
    }

    snapEndPoint(p5: p5, pan: Vector, scale: number, distance = 30): Point | null {
        const snapPts = this.toPointObjects().map((ptObj) => {
            return ptObj.snapNear(p5, pan, scale, distance);
        });
        const snapDist = snapPts.map((pt) => {
            return pt?.distance(PointObject.mousePt(p5, pan, scale).geometry);
        });

        const index = this.getSnapPtIndex(snapDist);
        if (index >= 0) {
            return snapPts[index];
        } else {
            return null;
        }
    }

    private getSnapPtIndex(snapDist: (number | undefined)[]): number {
        let minDist = Number.MAX_VALUE;
        for (let i = 0; i < snapDist.length; i++) {
            const element: number = snapDist[i]!;
            if (element >= 0) {
                minDist = element < minDist ? element : minDist;
            }
        }

        const index = snapDist.indexOf(minDist);
        if (index >= 0) {
            return index;
        } else {
            return -1;
        }
    }
}
