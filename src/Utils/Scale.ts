import { Point, Rectangle } from "building-editor-2d/Geometry";
import { AnalysisFloorGeometry, AnalysisLine, AnalysisPoint } from "types";
import { Floor } from "types/GeometryTypes";
import { ComputeBoundingBox } from ".";

export class CanvasScaler {
    canvasHeight: number;
    canvasWidth: number;
    scale: number;

    constructor(canvasHeight: number, canvasWidth: number, scale = 1) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.scale = scale;
    }

    private setScale(boundingBox: Rectangle): number {
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

    scaleFromFloors(floors: Floor[]): number {
        const boundingBox: Rectangle = ComputeBoundingBox.allFloors(floors);
        return this.setScale(boundingBox);
    }

    scaleFromZoneGeometries(geometries: AnalysisFloorGeometry[], includeOrigin = false): number {
        const boundingBox: Rectangle = ComputeBoundingBox.analysisFloorGeometries(geometries, includeOrigin);
        return this.setScale(boundingBox);
    }

    scaleFromCoordinates(coordinates: AnalysisPoint[]): number {
        const boundingBox: Rectangle = ComputeBoundingBox.zoneCoordinates(coordinates);
        return this.setScale(boundingBox);
    }

    scaleFromLines(lines: AnalysisLine[]): number {
        const boundingBox = ComputeBoundingBox.analysisLines(lines);
        return this.setScale(boundingBox);
    }
}
