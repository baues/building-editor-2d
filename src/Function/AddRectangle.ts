import p5 from 'p5';
import { Point, Rectangle } from '../Geometry';
import { ObjectColor, Snap } from 'building-editor-2d/types';
import { PointObject, RectangleObject } from '../Canvas/Object';
import { CanvasDocument, CanvasInfo, GeometryObject, Layer } from 'building-editor-2d/Canvas';
import { B2DMath } from 'building-editor-2d/Utils';


/**
 * Rectangle を描画するとき、マウスの点にサイズを表示する関数
 * @param info 
 * @param p 
 * @param startPt 
 * @param endPt
 */
function drawRectSizeText(info: CanvasInfo, p: p5, startPt: Point, endPt: Point): void {
    let dispNumDecimals;
    let dispFactor;

    if (info.unit.length === "m") {
        dispFactor = 1000;
        dispNumDecimals = info.tolerance - 4;
    } else if (info.unit.length === "mm") {
        dispFactor = 1;
        dispNumDecimals = info.tolerance;
    } else {
        throw new Error("unknown unit");
    }

    const size = 15 / info.scale;
    p.fill(0);
    p.noStroke();
    p.textFont('Helvetica');
    const letter =
        B2DMath.round(Math.abs(startPt.x - endPt.x) * dispFactor, dispNumDecimals) + "mm X " +
        B2DMath.round(Math.abs(startPt.y - endPt.y) * dispFactor, dispNumDecimals) + "mm";
    p.textSize(size);
    p.text(letter, endPt.x + 5 * size, endPt.y + size);
}

export function addRectangle(doc: CanvasDocument, p: p5): void {
    const info: CanvasInfo = doc.canvasInfo;
    const snap: Snap = doc.editorState.snap;
    const editingGeometry: GeometryObject[] = doc.editorState.editingGeometry;

    // レイヤーカラーの取得
    const activeLayer: Layer | undefined = doc.layers.find(l => l.name === info.activeLayer);
    const color: ObjectColor = activeLayer === undefined
        ? info.colorSet.find(color => color.name === info.colorMode)!.default
        : { stroke: activeLayer.color, fill: activeLayer.color };

    const pt: Point = snap.point === null
        ? PointObject.mousePt(p, info.canvasTranslate(), info.scale).geometry
        : snap.point;

    if (p.keyIsDown(p.ESCAPE)) {
        doc.clearTempGeometry();
    } else if (p.mouseIsPressed && p.mouseX > 250 && p.mouseX < p.width - 250) {
        if (editingGeometry.length === 0) {
            editingGeometry.push(new PointObject(pt));
            editingGeometry[0].isVisible = false;
        } else {
            const startPt: Point = editingGeometry[0].geometry as Point;
            new RectangleObject(new Rectangle(startPt, pt))
                .draw(p, color, info.scale);
            drawRectSizeText(info, p, startPt, pt);
        }
    } else if (editingGeometry.length > 0) {
        const startPt = editingGeometry[0].geometry as Point;
        if (pt.distance(startPt) >= info.toleranceValue()) {
            doc.geometryObjects.push(
                new RectangleObject(
                    new Rectangle(editingGeometry[0].geometry as Point, pt),
                    "",
                    info.activeLayer,
                ).toPolylineObject());
        }
        doc.clearTempGeometry();
    }
}
