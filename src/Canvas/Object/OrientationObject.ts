import p5 from 'p5';
import { DrawableObject } from 'building-editor-2d/Canvas';
import { ObjectColor } from 'building-editor-2d/types';
import { Point } from 'building-editor-2d/Geometry';

export class OrientationObject implements DrawableObject {
    isVisible = true;
    northAngle: number;
    drawCenter: Point;

    constructor(northAngle = 0, drawCenter = new Point(0, 0)) {
        this.northAngle = northAngle;
        this.drawCenter = drawCenter;
    }

    draw(p5: p5, color: ObjectColor, scale: number): void {
        const size = 20 / scale;
        const margin = 20 / scale;
        const angle = this.northAngle / 180 * Math.PI;
        const width = p5.windowWidth / scale;
        const height = p5.windowHeight / scale;
        const center = new Point(
            (size + margin) - width / 2 + this.drawCenter.x,
            height / 2 - (size + 4 * margin) + this.drawCenter.y,
        );

        p5.push();
        p5.noFill();
        p5.stroke(color.stroke);
        p5.strokeWeight(1 / scale);
        p5.circle(center.x, center.y, size * 2);
        this.triangle(p5, center.x, center.y, angle, size);

        p5.fill(color.fill);
        const letter = p5.char(78);
        const r2 = size + margin / 2;
        p5.textSize(20 / scale);
        p5.text(letter, center.x + r2 * Math.sin(angle), center.y - r2 * Math.cos(angle));
        p5.pop();
    }

    private triangle(p: p5, x: number, y: number, angle: number, r: number): void {
        // this code is to make the arrow point
        p.push(); // start new drawing state
        p.translate(x, y); // translates to the destination vertex
        p.rotate(angle); // rotates the arrow point
        p.triangle(-r / 2 * Math.sqrt(3), r / 2, r / 2 * Math.sqrt(3), r / 2, 0, -r); // draws the arrow point as a triangle
        p.pop();
    }
}
