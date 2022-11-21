import { Point, Polyline } from ".";

describe('Polyline', () => {
    test('getBoundingBox', () => {
        const pLine = new Polyline();
        pLine.push(new Point(-8.434585, 3.782531));
        pLine.push(new Point(-1.413438, -0.595971));
        pLine.push(new Point(4.649102, 2.487116));
        pLine.push(new Point(-1.879787, 11.140485));
        pLine.push(new Point(-8.408676, 10.674136));

        const bBox = pLine.getBoundingBox();
        expect(bBox.maxX()).toBeCloseTo(4.649);
        expect(bBox.maxY()).toBeCloseTo(11.14);
        expect(bBox.minX()).toBeCloseTo(-8.434);
        expect(bBox.minY()).toBeCloseTo(-0.595);
    });

    test('pointInCurve', () => {
        const pLine = new Polyline();
        pLine.push(new Point(-1, -1));
        pLine.push(new Point(-1, 1));
        pLine.push(new Point(1, 1));
        pLine.push(new Point(1, -1));
        // 内側
        const pt1 = new Point(0, 0);
        expect(pLine.pointInCurve(pt1)).toBe(true);
        // Line上
        const pt2 = new Point(0, -1);
        expect(pLine.pointInCurve(pt2)).toBe(true);
        // line上(左下角なので2回交差するため false)
        const pt3 = new Point(-1, -1);
        expect(pLine.pointInCurve(pt3)).toBe(false);
        // 外側 交差0
        const pt4 = new Point(0, -5);
        expect(pLine.pointInCurve(pt4)).toBe(false);
        // 外側 交差0
        const pt5 = new Point(2, 1);
        expect(pLine.pointInCurve(pt5)).toBe(false);
        // 外側 交差2
        const pt6 = new Point(-2, 0);
        expect(pLine.pointInCurve(pt6)).toBe(false);
    });
});
