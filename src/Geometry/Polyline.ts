import { GeometryBase, Point, Line, Rectangle, Intersect } from '.';

/**
 * 2D のポリラインを表すクラス
 */
export class Polyline extends GeometryBase {
    ptList: Point[] = [];
    isClosed = true;

    constructor();
    constructor(ptList?: Point[]) {
        super();

        if (ptList) {
            this.ptList = ptList;
        }
    }

    count(): number {
        return this.ptList.length;
    }

    push(pt: Point): void {
        this.ptList.push(pt);
    }

    pop(): void {
        this.ptList.pop();
    }

    /**
     * ポリラインを線分に変換する。
     * @returns 
     */
    toLineArray(): Line[] {
        const lineArray: Line[] = [];

        for (let i = 0; i < this.ptList.length - 1; i++) {
            lineArray.push(new Line(this.ptList[i], this.ptList[i + 1]));
        }
        if (this.isClosed) {
            lineArray.push(new Line(this.ptList[this.count() - 1], this.ptList[0]));
        }

        return lineArray;
    }

    /**
     * ポリラインを構成する点のリストを取得する。
     * @returns 
     */
    toPointArray(): Point[] {
        return this.ptList;
    }

    /**
     * BoundingBox の取得
     * @returns 
     */
    getBoundingBox(): Rectangle {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = -Number.MAX_VALUE;
        let maxY = -Number.MAX_VALUE;

        this.ptList.forEach((pt) => {
            maxX = pt.x > maxX ? pt.x : maxX;
            maxY = pt.y > maxY ? pt.y : maxY;
            minX = pt.x < minX ? pt.x : minX;
            minY = pt.y < minY ? pt.y : minY;
        });

        return new Rectangle(
            new Point(minX, minY),
            new Point(maxX, maxY),
        );
    }

    /**
     * Crossing Number Algorithm による点の内外判定を行う。
     * 交差数を数えているだけのためカーブ上に点がある場合、正確でない場合がある。
     * @param pt 判定対象の点
     * @returns 内側にある場合は true を返す。
     */
    pointInCurve(pt: Point): boolean {
        if (this.isClosed === false) {
            return false;
        }

        const lineArray = this.toLineArray();
        const IntersectPtCount = lineArray
            .map(line => Intersect.lineLine(line, new Line(pt, pt.add(new Point(1, 0))), true, false))
            .filter((pt) => pt !== null)
            .length;
        return (IntersectPtCount % 2) === 1;
    }
}
