/**
 * 数値の幅を表すクラス
 */
export class Interval {
    private _min: number;
    private _max: number;

    constructor(min: number, max: number) {
        this._min = min < max ? min : max;
        this._max = max > min ? max : min;
    }

    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }

    length(): number {
        return this._max - this._min;
    }

    mid(): number {
        return (this._min + this._max) / 2;
    }
}
