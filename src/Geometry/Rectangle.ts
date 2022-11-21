import { GeometryBase, Interval, Point, Polyline, Line } from '.';

// TODO: 現在軸に平行な矩形しかかけないので 軸情報をもたせ斜めにも対応する
/**
 * 2D の矩形を表すクラス。
 */
export class Rectangle extends GeometryBase {
    private _ptLL: Point;
    private _ptLR: Point;
    private _ptUL: Point;
    private _ptUR: Point;
    private _ptList: Point[] = [];

    constructor(pt1: Point, pt2: Point) {
        super();
        const minX = Math.min(pt1.x, pt2.x);
        const minY = Math.min(pt1.y, pt2.y);
        const maxX = Math.max(pt1.x, pt2.x);
        const maxY = Math.max(pt1.y, pt2.y);

        this._ptLL = new Point(minX, minY);
        this._ptLR = new Point(maxX, minY);
        this._ptUL = new Point(minX, maxY);
        this._ptUR = new Point(maxX, maxY);
        this._ptList = [this._ptLL, this._ptLR, this._ptUR, this._ptUL];
    }

    get ptList(): Point[] {
        return this._ptList;
    }

    hight(): number {
        return this.intervalY().length();
    }

    width(): number {
        return this.intervalX().length();
    }

    minX(): number {
        return this.intervalX().min;
    }

    minY(): number {
        return this.intervalY().min;
    }

    maxX(): number {
        return this.intervalX().max;
    }

    maxY(): number {
        return this.intervalY().max;
    }

    center(): Point {
        return new Point(this.intervalX().mid(), this.intervalY().mid());
    }

    intervalX(): Interval {
        return new Interval(this._ptLL.x, this._ptUR.x);
    }

    intervalY(): Interval {
        return new Interval(this._ptLL.y, this._ptUR.y);
    }

    toPolyline(): Polyline {
        const polyline = new Polyline();
        polyline.push(this._ptLL);
        polyline.push(this._ptLR);
        polyline.push(this._ptUR);
        polyline.push(this._ptUL);
        polyline.isClosed = true;
        return polyline;
    }

    toLineArray(): Line[] {
        return this.toPolyline().toLineArray();
    }

    area(): number {
        return this.hight() * this.width();
    }

    getBoundingBox(): Rectangle {
        return this;
    }
}
