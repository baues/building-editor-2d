import p5 from 'p5';
import { Line, Point, Vector } from '../Geometry';
import { ObjectColorSet, Snap, SnapMode } from '../types';
import { B2DMath } from '../Utils';
import { LineObject, PointObject } from '../Canvas/Object';
import { CanvasDocument, CanvasInfo, GeometryObject } from '../Canvas';

function PointSnap(doc: CanvasDocument, p: p5, info: CanvasInfo, minPtDist: number, snap: Snap, color: ObjectColorSet) {
    const visibleLayers: string[] = doc.layers
        .filter(layer => layer.isVisible)
        .map(layer => layer.name);
    const visibleObj: GeometryObject[] = doc.geometryObjects
        .filter(obj => visibleLayers.includes(obj.layerName));
    const distArray: number[] = visibleObj
        .map(obj => obj.mouseDist(p, info.canvasTranslate(), info.scale));

    minPtDist = Math.min(...distArray);
    const index = distArray.indexOf(minPtDist);
    if (index >= 0) {
        snap.point = visibleObj[index]
            .snap(p, snap.mode, info.canvasTranslate(), info.scale);

        if (snap.point) {
            new PointObject(snap.point).draw(p, color.default, info.scale, true, 10);
        }
    }
    snap.objectIndex = doc.geometryObjects.indexOf(visibleObj[index]);
    return minPtDist;
}

function gridSnap(info: CanvasInfo, p: p5, minDist: number, snap: Snap, color: ObjectColorSet) {
    const gridInterval = info.gridInterval;
    const mousePt: Point = PointObject.mousePt(p, info.canvasTranslate(), info.scale).geometry;
    const gridPt: Point = new Point(B2DMath.round(mousePt.x, gridInterval), B2DMath.round(mousePt.y, gridInterval));
    const gridDist: number = gridPt.distance(mousePt);

    if ((gridDist < minDist || snap.point === null) &&
        p.mouseX > 250 && p.mouseX < p.width - 250) {
        snap.point = gridPt;
        snap.objectIndex = -1;
        new PointObject(snap.point).draw(p, color.default, info.scale, true, 10);
    }
}

/**
 * スナップ点とマウスの点から指定した角度のベクトルを返す
 * @param mousePt 
 * @param snapPt 
 * @param divide pi を何分割するかの設定。45度ごとにスナップする場合は 4
 */
export function GetSnapAngleVector(mousePt: Point, snapPt: Point, divide: number): Vector {
    const vec: Vector = Vector.from2Points(snapPt, mousePt);
    const angleX: number = vec.angle(Vector.unitX());
    const angleY: number = vec.angle(Vector.unitY());

    const angles: number[] = [];
    const angleSubtract: number[] = [];
    for (let i = 0; i < divide + 1; i++) {
        angles.push(i * Math.PI / divide);
        angleSubtract.push(Math.abs(i * Math.PI / divide - angleX));
    }
    const min = Math.min(...angleSubtract);
    const rotateAngle = angles[angleSubtract.indexOf(min)];

    if (angleY < Math.PI / 2) {
        return Vector.unitX().rotate(rotateAngle);
    } else {
        return Vector.unitX().rotate(-rotateAngle);
    }
}

export function snap(doc: CanvasDocument, p: p5): void {
    const info = doc.canvasInfo;
    const snap = doc.editorState.snap;
    const color: ObjectColorSet = info.colorSet.find(color => color.name === info.colorMode)!;
    let minPtDist = Number.MAX_VALUE;

    if (snap.mode.endPoint || snap.mode.middle || snap.mode.near) {
        minPtDist = PointSnap(doc, p, info, minPtDist, snap, color);
        if (snap.point) {
            snap.holdPoint = snap.point;
        }
    }

    // Angle Snap
    if (snap.mode.angle && snap.holdPoint && (snap.mode.endPoint || snap.mode.middle)) {
        new PointObject(snap.holdPoint).draw(p, color.default, info.scale, true, 10);
        const length = p.windowWidth;
        const mousePt = PointObject.mousePt(p, info.canvasTranslate(), info.scale).geometry;

        const angleLine = Line.createFromSDL(snap.holdPoint, GetSnapAngleVector(mousePt, snap.holdPoint, 4), length);
        const angleLineObj = new LineObject(angleLine);
        angleLineObj.draw(p, color.default, info.scale);
        const mode: SnapMode = { endPoint: true, middle: false, near: true, angle: false, grid: false };
        const anglePt: Point | null = angleLineObj.snap(p, mode, info.canvasTranslate(), info.scale);
        if (anglePt) {
            snap.point = anglePt;
            new PointObject(anglePt).draw(p, color.default, info.scale, true, 10);
        } else {
            snap.holdPoint = null;
        }
    } else {
        snap.holdPoint = null;
    }

    if (snap.mode.grid) {
        gridSnap(info, p, minPtDist, snap, color);
    }
}
