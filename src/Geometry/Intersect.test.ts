import { Intersect, Line, Point, Vector } from ".";

describe('line-line', () => {
    test('intersect', () => {
        const ln1 = new Line(
            new Point(1, 0),
            new Point(6, 15),
        );
        const ln2 = new Line(
            new Point(5, 5),
            new Point(-5, 0),
        );

        expect(Intersect.lineLine(ln1, ln2)!.x)
            .toBeCloseTo(2.2);
        expect(Intersect.lineLine(ln1, ln2)!.y)
            .toBeCloseTo(3.6);
    });

    test('no intersect', () => {
        const ln1 = new Line(
            new Point(1, 0),
            new Point(8, 5),
        );
        const ln2 = new Line(
            new Point(5, 5),
            new Point(-5, 0),
        );

        expect(Intersect.lineLine(ln1, ln2))
            .toBe(null);
    });
});

describe('vec-line', () => {
    test('intersect', () => {
        const vec = new Vector(5, 15);
        const line = new Line(
            new Point(5, 5),
            new Point(-5, 5),
        );

        expect(Intersect.vectorLine(vec, line, false, false)!.x)
            .toBeCloseTo(1.6667);
        expect(Intersect.vectorLine(vec, line, false, false)!.y)
            .toBeCloseTo(5.00);
    });

    test('intersect with short vector', () => {
        const vec = new Vector(5, 15).unit();
        const line = new Line(
            new Point(5, 5),
            new Point(-5, 5),
        );

        expect(Intersect.vectorLine(vec, line, false, false)!.x)
            .toBeCloseTo(1.6667);
        expect(Intersect.vectorLine(vec, line, false, false)!.y)
            .toBeCloseTo(5.00);
    });

    test('no intersect with short vector', () => {
        const vec = new Vector(5, 15).unit();
        const line = new Line(
            new Point(5, 5),
            new Point(-5, 5),
        );

        expect(Intersect.vectorLine(vec, line, true, false))
            .toBe(null);
    });
});
