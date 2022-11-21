import { Line, Point, Vector } from ".";

export class Intersect {
    /**
     * 2直線の交点を返す
     * @param line1 
     * @param line2 
     * @returns 
     */
    static lineLine(line1: Line, line2: Line, withinLine1 = true, withinLine2 = true): Point | null {
        const vecAB = line1.toVector();
        const n1 = vecAB.unit();
        const vecCD = line2.toVector();
        const n2 = vecCD.unit();
        const vecAC = line2.from.subtract(line1.from).toVector();

        const n1AC = n1.dotProduct(vecAC);
        const n2AC = n2.dotProduct(vecAC);
        const n1n2 = n1.dotProduct(n2);

        // 平行なときは null
        if (Math.abs(1.0 - Math.abs(n1n2)) < 1e-5) {
            return null;
        }

        // d1 は点 A から d2 は点 C からの距離
        const d1 = (n1AC - n2AC * n1n2) / (1 - n1n2 * n1n2);
        const d2 = (-n2AC + n1AC * n1n2) / (1 - n1n2 * n1n2);

        // 交点が線分中にないときは null
        if (d1 < 0 || d2 < 0) {
            return null;
        } else if (d1 > vecAB.length() && withinLine1) {
            return null;
        } else if (d2 > vecCD.length() && withinLine2) {
            return null;
        } else {
            return line2.from.add(n2.multiply(d2).toPoint());
        }
    }

    /**
     * Line と Vector の交点を求める
     * （ 参考 https://qiita.com/kit2cuz/items/ef93aeb558f353ab479c ）
     * @param vec 
     * @param line 
     * @param withinInput 
     * @param withinTarget 
     * @returns 
     */
    static vectorLine(vec: Vector, line: Line, withinInput: boolean, withinTarget: boolean): Point | null {
        const vecLine = new Line(Point.zero(), vec.toPoint());
        return this.lineLine(vecLine, line, withinInput, withinTarget);
    }
}
