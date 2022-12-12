import { Point } from '../Geometry/Point';
import { GetSnapAngleVector } from './Snap';

describe("Snap", () => {
    test("GetSnapAngleVector", () => {
        const pt0 = new Point(0, 0);

        const pt1 = new Point(1, 1.5);
        const angle1 = GetSnapAngleVector(pt1, pt0, 4);
        expect(angle1.x).toBeCloseTo(1 / Math.sqrt(2));
        expect(angle1.y).toBeCloseTo(1 / Math.sqrt(2));

        const pt2 = new Point(1, -1.5);
        const angle2 = GetSnapAngleVector(pt2, pt0, 4);
        expect(angle2.x).toBeCloseTo(1 / Math.sqrt(2));
        expect(angle2.y).toBeCloseTo(-1 / Math.sqrt(2));
    });
});