import { Point, Rectangle } from "../Geometry";

export class CanvasScaler {
    canvasHeight: number;
    canvasWidth: number;
    scale: number;

    constructor(canvasHeight: number, canvasWidth: number, scale = 1) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.scale = scale;
    }

    setScale(boundingBox: Rectangle): number {
        const bBoxWidth = boundingBox.width();
        const bBoxHeight = boundingBox.hight();

        const maxRatio = 0.5;
        const maxWidth = this.canvasWidth * maxRatio;
        const maxHeight = this.canvasHeight * maxRatio;
        this.scale = Math.min(maxWidth / bBoxWidth, maxHeight / bBoxHeight);

        return this.scale;
    }

    scaledCenterPoint(boundingBox: Rectangle): Point {
        const minX = boundingBox.minX();
        const minY = boundingBox.minY();

        const bBoxWidth = boundingBox.width();
        const bBoxHeight = boundingBox.hight();
        const baseShiftX = -minX * this.scale;
        const baseShiftY = -minY * this.scale;

        const shiftX = this.canvasWidth / 2 - bBoxWidth * this.scale / 2 + baseShiftX;
        const shiftY = this.canvasHeight / 2 - bBoxHeight * this.scale / 2 + baseShiftY;

        return new Point(shiftX, shiftY);
    }

    scaleFromBoundingBox(boundingBox: Rectangle): number {
        return this.setScale(boundingBox);
    }
}
