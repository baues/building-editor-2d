import p5 from 'p5';
import { Vector } from '../Geometry';
import { CanvasDocument } from '../Canvas';

export function panCanvas(doc: CanvasDocument, p: p5, vec: Vector | null): void {
    const info = doc.canvasInfo;
    let pan: Vector;
    if (vec !== null) {
        pan = vec;
    } else {
        pan = new Vector(
            p.pmouseX - p.mouseX,
            p.pmouseY - p.mouseY,
        );
    }
    info.drawCenter = info.drawCenter.add(pan.divide(info.scale).toPoint());

    const canvasObject = doc.canvasObject;
    canvasObject.orientation.drawCenter = info.drawCenter;
    canvasObject.scaleBar.drawCenter = info.drawCenter;
}
