import { CanvasScaler, ComputeBoundingBox } from '../Utils';
import { CanvasDocument } from 'building-editor-2d/Canvas';

export function zoomExtendAll(doc: CanvasDocument): void {
    const info = doc.canvasInfo;
    const bbox = ComputeBoundingBox.geometryObjects(doc.geometryObjects, false);
    const scaler = new CanvasScaler(info.height, info.width);
    info.scale = scaler.scaleFromBoundingBox(bbox);
    info.drawCenter = bbox.center();

    const canvasObject = doc.canvasObject;
    canvasObject.orientation.drawCenter = info.drawCenter;
    canvasObject.scaleBar.drawCenter = info.drawCenter;

    doc.editorState.function = "Select";
}
