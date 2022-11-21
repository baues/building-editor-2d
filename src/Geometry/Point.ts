import { GeometryBase, Rectangle, Vector } from '.';

/**
 * 2D のポイントを表すクラス
 */
export class Point extends GeometryBase {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    static zero(): Point {
        return new Point(0, 0);
    }

    static unitX(): Point {
        return new Point(1, 0);
    }

    static unitY(): Point {
        return new Point(0, 1);
    }

    distance(pt: Point): number{
        return Math.sqrt(Math.pow(this.x - pt.x, 2) + Math.pow(this.y - pt.y, 2));
    }

    toVector(): Vector {
        return new Vector(this.x, this.y);
    }

    add(point: Point): Point {
        return new Point(this.x + point.x, this.y + point.y);
    }

    subtract(point: Point): Point {
        return new Point(this.x - point.x, this.y - point.y);
    }

    multiply(number: number): Point {
        return new Point(this.x * number, this.y * number);
    }

    divide(number: number): Point {
        return new Point(this.x / number, this.y / number);
    }

    getBoundingBox(): Rectangle {
        const e = 0.1;
        const pt1 = new Point(this.x - e, this.y - e);
        const pt2 = new Point(this.x + e, this.y + e);
        return new Rectangle(pt1, pt2);
    }
}