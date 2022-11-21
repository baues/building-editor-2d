import p5 from 'p5';
import { Point } from 'building-editor-2d/Geometry';
import { DrawableObject } from "building-editor-2d/Canvas";
import { ObjectColor } from 'building-editor-2d/types';

export class AxisObject implements DrawableObject {
    isVisible = true;
    origin: Point;
    length: number;

    constructor(origin = Point.zero(), length = 100000) {
        this.origin = origin;
        this.length = length;
    }

    /**
     * 軸の描画
     * @param p5 
     * @param color fill が X軸、stroke が Y軸 のカラーになる
     * @param scale 
     */
    draw(p5: p5, color: ObjectColor, scale: number): void {
        const origin = new Point(this.origin.x, this.origin.y);
        const length = this.length;

        p5.strokeWeight(2.0 / scale);
        p5.stroke(color.fill);
        p5.line(origin.x, origin.y, origin.x + length, origin.y);
        p5.stroke(color.stroke);
        p5.line(origin.x, origin.y, -origin.x, -(origin.y + length));
    }
}
