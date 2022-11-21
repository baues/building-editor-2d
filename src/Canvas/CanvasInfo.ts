import { Point, Vector } from 'building-editor-2d/Geometry';
import { ObjectColorSet } from 'building-editor-2d/types';

export class CanvasInfo {
    scale: number;
    height: number;
    width: number;
    drawCenter: Point;
    colorSet: ObjectColorSet[];
    colorMode = "";
    /**作図対象になっているレイヤー名。可視化するかどうかはレイヤーの isVisible が持っている*/
    activeLayer = "Layer0";
    /**Canvas で扱うモデルで保証する精度の小数点以下桁数。 0 ならば整数、1 ならば少数第一位まで*/
    tolerance: number;
    /**扱うモデルの桁数*/
    toleranceAngle: number;
    /**扱うモデルの桁数*/
    gridInterval: number;
    /***/
    isActive = true;
    /**単位*/
    unit = {
        length: "m",
        angle: "radian",
    };

    constructor(
        scale: number, height: number, width: number,
        drawCenter = Point.zero(), colorSet = CanvasInfo.defaultColor(),
        tolerance = 4, toleranceAngle = 1, gridInterval = 1,
    ) {
        this.scale = scale;
        this.height = height;
        this.width = width;
        this.drawCenter = drawCenter;
        this.colorSet = colorSet;
        this.tolerance = tolerance;
        this.toleranceAngle = toleranceAngle;
        this.gridInterval = gridInterval;
    }

    /**
     * 桁数ではなく数値での tolerance を返す
     * @returns 
     */
    toleranceValue(): number {
        return Math.pow(10, -this.tolerance);
    }

    canvasTranslate(): Vector {
        return new Vector(
            this.width / 2 - this.drawCenter.x * this.scale,
            this.height / 2 - this.drawCenter.y * this.scale,
        );
    }

    addColor(color: ObjectColorSet): void {
        this.colorSet.push(color);
    }

    deleteColor(name: string): void {
        this.colorSet = this.colorSet.filter(color => color.name !== name);
    }

    static defaultColor(): ObjectColorSet[] {
        const colors: ObjectColorSet[] = [];
        colors.push({
            name: 'light',
            default: {
                stroke: 'rgba(1, 1, 1, 1)',
                fill: 'rgba(1, 1, 1 ,1)',
            },
            select: {
                stroke: 'rgba(255, 0, 0, 1)',
                fill: 'rgba(240, 128, 128, 0.5)',
            },
            axis: {
                stroke: 'blue',
                fill: 'red',
            },
            grid: {
                stroke: 'lightgray',
                fill: 'lightgray',
            },
            scaleBar: {
                stroke: 'black',
                fill: 'black',
            },
            orientation: {
                stroke: 'black',
                fill: 'black',
            },
        });
        colors.push({
            name: 'dark',
            default: {
                stroke: 'white',
                fill: 'white',
            },
            select: {
                stroke: 'rgba(255, 0, 0, 1)',
                fill: 'rgba(240, 128, 128, 0.5)',
            },
            axis: {
                stroke: 'blue',
                fill: 'red',
            },
            grid: {
                stroke: '#444444',
                fill: '#444444',
            },
            scaleBar: {
                stroke: 'white',
                fill: 'white',
            },
            orientation: {
                stroke: 'white',
                fill: 'white',
            },
        });

        return colors;
    }

    setDefaultColor(): void {
        this.colorSet = CanvasInfo.defaultColor();
    }
}
