import p5 from 'p5';
import { Point } from 'building-editor-2d/Geometry';
import { DrawableObject } from "building-editor-2d/Canvas";
import { ObjectColor } from 'building-editor-2d/types';

export class GridObject implements DrawableObject {
    isVisible = true;
    size: number;
    primarySpacing: number;
    subdivisions: number;
    origin: Point;

    constructor(size = 1000, primarySpacing = 10, subdivisions = 5, origin = Point.zero()) {
        this.size = size;
        this.primarySpacing = primarySpacing;
        this.subdivisions = subdivisions;
        this.origin = origin;
    }

    /**
     * 
     * @param p5 
     * @param color fill が内部分割の線の色、stroke がメインのグリッドの色
     * @param scale 
     */
    draw(p5: p5, color: ObjectColor, scale: number): void {
        const length = this.size / 2;
        const origin = new Point(this.origin.x, this.origin.y);

        for (let i = 0; i < length / this.primarySpacing; i++) {
            p5.stroke(color.fill);
            p5.strokeWeight(1.0 / scale / 2);
            const interval = i * this.primarySpacing;

            for (let j = 1; j < this.subdivisions; j++) {
                const subInterval = j * this.primarySpacing / this.subdivisions + interval;
                p5.line(origin.x + subInterval, origin.y - length, origin.x + subInterval, origin.y + length);
                p5.line(origin.x - length, origin.y + subInterval, origin.x + length, origin.y + subInterval);
                p5.line(origin.x - subInterval, origin.y - length, origin.x - subInterval, origin.y + length);
                p5.line(origin.x - length, origin.y - subInterval, origin.x + length, origin.y - subInterval);
            }

            p5.stroke(color.stroke);
            p5.strokeWeight(1.0 / scale);
            p5.line(origin.x + interval, origin.y - length, origin.x + interval, origin.y + length);
            p5.line(origin.x - length, origin.y + interval, origin.x + length, origin.y + interval);
            p5.line(origin.x - interval, origin.y - length, origin.x - interval, origin.y + length);
            p5.line(origin.x - length, origin.y - interval, origin.x + length, origin.y - interval);
        }

        p5.line(origin.x + length, origin.y - length, origin.x + length, origin.y + length);
        p5.line(origin.x - length, origin.y + length, origin.x + length, origin.y + length);
        p5.line(origin.x - length, origin.y - length, origin.x - length, origin.y + length);
        p5.line(origin.x - length, origin.y - length, origin.x + length, origin.y - length);
    }
}
