import { Vector } from '.';
import { Line } from './Line';
import { Point } from './Point';

describe('Line', () => {
    test('closest point & distance', () => {
        const pt1 = new Point(2, 2);
        const ln1 = new Line(new Point(0, 0), new Point(5, 0));
        expect(ln1.closestPoint(pt1)).toEqual(new Point(2, 0));
        expect(ln1.distance(pt1)).toEqual(2);

        const pt2 = new Point(10, 5);
        const ln2 = new Line(new Point(0, 0), new Point(5, 0));
        expect(ln2.closestPoint(pt2)).toEqual(new Point(5, 0));
        expect(ln2.distance(pt2)).toBeCloseTo(7.071);

        const pt3 = new Point(-5, 5);
        const ln3 = new Line(new Point(0, 0), new Point(5, 0));
        expect(ln3.closestPoint(pt3)).toEqual(new Point(0, 0));
        expect(ln3.distance(pt3)).toBeCloseTo(7.071);

        const pt4 = new Point(2, 5);
        const ln4 = new Line(new Point(0, 2), new Point(5, 0));
        expect(ln4.closestPoint(pt4).x).toBeCloseTo(0.6896);
        expect(ln4.closestPoint(pt4).y).toBeCloseTo(1.7241);
        expect(ln4.distance(pt4)).toBeCloseTo(3.5282);
    });

    test('evaluateClosestPoint', () => {
        const point = new Point(2, 6);
        const line = new Line(new Point(0, 0), new Point(8, 5));
        expect(line.evaluateClosestPoint(point)).toBeCloseTo(0.516);
    });

    test('evaluateLine', () => {
        const line = new Line(new Point(0, 0), new Point(8, 5));
        expect(line.evaluateLine(0.1)!.x).toBeCloseTo(0.8);
        expect(line.evaluateLine(0.1)!.y).toBeCloseTo(0.5);
        expect(line.evaluateLine(-1)).toBe(null);
    });

    test('lineSDL', () => {
        const start = new Point(2, 6);
        const direction = new Vector(2, 1);
        const length = 10;
        expect(Line.createFromSDL(start, direction, length).to.x).toBeCloseTo(10.944);
        expect(Line.createFromSDL(start, direction, length).to.y).toBeCloseTo(10.472);
    });
});
