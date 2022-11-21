import p5 from 'p5';
import { DrawableObject } from 'building-editor-2d/Canvas';
import { ObjectColor } from 'building-editor-2d/types';
import { Point } from 'building-editor-2d/Geometry';

export class ScaleObject implements DrawableObject {
    isVisible = true
    drawCenter: Point;

    constructor(drawCenter = new Point(0, 0)) {
        this.drawCenter = drawCenter;
    }

    draw(p5: p5, color: ObjectColor, scale: number): void {
        const margin = 20 / scale;
        const width = p5.windowWidth / scale;
        const height = p5.windowHeight / scale;
        const start = new Point(
            margin - width / 2 + this.drawCenter.x,
            height / 2 - 2 * margin + this.drawCenter.y,
        );
        const length = 5;

        p5.stroke(color.stroke);
        p5.strokeWeight(1 / scale);
        p5.fill(color.fill);
        p5.textSize(15 / scale);

        p5.line(start.x, start.y, start.x + 5, start.y);
        p5.strokeWeight(0.5 / scale);
        for (let i = 0; i < length + 1; i++) {
            p5.line(start.x + i, start.y, start.x + i, start.y - 0.2);

            if (i !== length) {
                p5.text(i, start.x + i, start.y - 0.5);
            } else {
                p5.text(i + 'm', start.x + i, start.y - 0.5);
            }
        }
    }
}
