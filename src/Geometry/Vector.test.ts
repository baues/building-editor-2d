import { Point, Vector } from ".";

describe('Vector', () => {
    const vec = new Vector(1, 1);

    test('from2pt', () => {
        const vec2 = Vector.from2Points(new Point(0, 0), new Point(1, 1));
        expect(vec2.x).toBe(1);
        expect(vec2.y).toBe(1);
        const vec3 = Vector.from2Points(new Point(1, 1), new Point(0, 0));
        expect(vec3.x).toBe(-1);
        expect(vec3.y).toBe(-1);
    });

    test('rotate', () => {
        expect(vec.rotate(2).x).toBeCloseTo(-1.325);
        expect(vec.rotate(2).y).toBeCloseTo(0.493);
        expect(vec.rotate(Math.PI / 2).x).toBeCloseTo(-1);
        expect(vec.rotate(Math.PI / 2).y).toBeCloseTo(1);
        expect(vec.rotate(-Math.PI / 2).x).toBeCloseTo(1);
        expect(vec.rotate(-Math.PI / 2).y).toBeCloseTo(-1);
    });

    test('add', () => {
        expect(vec.add(vec)).toEqual(new Vector(2, 2));
    });

    test('subtract', () => {
        expect(vec.subtract(vec)).toEqual(Vector.zero());
    });

    test('multiply', () => {
        expect(vec.multiply(4)).toEqual(new Vector(4, 4));
    });

    test('divide', () => {
        expect(vec.divide(4)).toEqual(new Vector(0.25, 0.25));
    });

    test('dotProduct', () => {
        const vec2 = new Vector(2, 5.5);
        expect(vec.dotProduct(vec2)).toEqual(7.5);
    });

    test('angle', () => {
        const vec2 = new Vector(-1, 1);
        const vec3 = new Vector(-1, -1);
        const vec4 = new Vector(1, -1);
        const unitX = Vector.unitX();
        const unitY = Vector.unitY();
        expect(vec.angle(unitX)).toBeCloseTo(Math.PI / 4);
        expect(vec.angle(unitY)).toBeCloseTo(Math.PI / 4);
        expect(vec2.angle(unitX)).toBeCloseTo(3 * Math.PI / 4);
        expect(vec2.angle(unitY)).toBeCloseTo(Math.PI / 4);
        expect(vec3.angle(unitX)).toBeCloseTo(3 * Math.PI / 4);
        expect(vec3.angle(unitY)).toBeCloseTo(3 * Math.PI / 4);
        expect(vec4.angle(unitX)).toBeCloseTo(Math.PI / 4);
        expect(vec4.angle(unitY)).toBeCloseTo(3 * Math.PI / 4);
    });
});
