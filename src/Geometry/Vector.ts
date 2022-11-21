import { GeometryBase, Point, Rectangle } from '.';

/**
 * 2D のベクトルを表すクラス
 */
export class Vector extends GeometryBase {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    /**
     * p1 から p2 に向かうベクトルを返す
     * @param p1 
     * @param p2 
     * @returns 
     */
    static from2Points(p1: Point, p2: Point): Vector {
        return new Vector(p2.x - p1.x, p2.y - p1.y);
    }

    /**
     * ゼロベクトルを返す
     * @returns 
     */
    static zero(): Vector {
        return new Vector(0, 0);
    }

    /**
     * X 方向の単位ベクトルを返す
     * @returns 
     */
    static unitX(): Vector {
        return new Vector(1, 0);
    }

    /**
     * Y 方向の単位ベクトルを返す
     * @returns 
     */
    static unitY(): Vector {
        return new Vector(0, 1);
    }

    /**
     * ベクトルを単位ベクトル化する
     * @returns 
     */
    unit(): Vector {
        return new Vector(this.x / this.length(), this.y / this.length());
    }

    /**
     * ベクトルの長さを返す
     * @returns 
     */
    length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * 入力の角度(radian)分だけ、ベクトルを回転させる
     * 正の値が時計回り
     * @param radian 
     * @returns 
     */
    rotate(radian: number): Vector {
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;
        return new Vector(x, y);
    }

    /**
     * 成分ごとの和を返す
     * @param vector 
     * @returns 
     */
    add(vector: Vector): Vector {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    /**
     * 成分ごとの差を返す
     * @param vector 
     * @returns 
     */
    subtract(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    /**
     * 各成分を入力のスカラー倍にする
     * @param number 
     * @returns 
     */
    multiply(number: number): Vector {
        return new Vector(this.x * number, this.y * number);
    }

    /**
     * 各成分を入力のスカラーで割る
     * @param number 
     * @returns 
     */
    divide(number: number): Vector {
        return new Vector(this.x / number, this.y / number);
    }

    /**
     * 内積を返す
     * @param vector 
     * @returns 
     */
    dotProduct(vector: Vector): number {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * 引数のベクトルとの角度を返す
     * @param vector 
     * @returns 0 ~ π の値
     */
    angle(vector: Vector): number {
        const cos = this.dotProduct(vector) / (this.length() * vector.length());
        return Math.acos(cos);
    }

    /**
     * ベクトル成分を持つ Point を返す
     * @returns 
     */
    toPoint(): Point {
        return new Point(this.x, this.y);
    }

    getBoundingBox(): Rectangle {
        return this.toPoint().getBoundingBox();
    }
}
