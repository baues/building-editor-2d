import p5 from 'p5';
import { PointObject, PolylineObject } from '../Canvas/Object';
import { CanvasDocument } from 'building-editor-2d/Canvas';

/**オブジェクトの選択 */
function selectGeometryObjects(doc: CanvasDocument, p: p5) {
    // 可視化対象でかつロックされていないレイヤーがあるかの判定
    const selectableLayers = doc.layers.filter(layer => layer.isVisible && !layer.isLocked).map(layer => layer.name);
    if (selectableLayers.length === 0) {
        return;
    }
    // ポリラインを取得
    const plineObj: PolylineObject[] = doc.geometryObjects
        .filter(obj => selectableLayers.includes(obj.layerName))
        .filter(obj => obj.objectType === 'Polyline') as PolylineObject[];
    // ポリラインの内側にマウスの点があった場合は選択に追加
    const mousePt = PointObject.mousePt(p, doc.canvasInfo.canvasTranslate(), doc.canvasInfo.scale).geometry;
    const selectObj = plineObj
        .find(obj => obj.geometry.pointInCurve(mousePt));
    if (selectObj !== undefined) {
        selectObj.isSelected = true;
    }
}

/** 選択されているオブジェクトを doc の geometryObjects から取り除く*/
function removeGeometryObjects(doc: CanvasDocument) {
    doc.geometryObjects = doc.geometryObjects.filter(obj => !obj.isSelected);
}

/** オブジェクトの選択状態を解除 */
function unselectGeometryObjects(doc: CanvasDocument) {
    doc.geometryObjects.forEach(obj => obj.isSelected = false);
}

/**
 * p5js の情報から geometryObject に対して選択されているかのブールを設定する関数
 * @param doc 
 * @param p 
 * @returns 
 */
export function selectGeometry(doc: CanvasDocument, p: p5): void {
    if (p.mouseIsPressed && p.mouseX > 250 && p.mouseX < p.width - 250 && doc.geometryObjects.length >= 1) {
        selectGeometryObjects(doc, p);
    } else if (p.keyIsDown(p.BACKSPACE)) {
        removeGeometryObjects(doc);
    } else if (p.keyIsDown(p.ESCAPE)) {
        unselectGeometryObjects(doc);
    }
}
