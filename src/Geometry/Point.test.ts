import { Point } from './Point';

test('PointTest', () => {
    expect(Point.zero()).toEqual(new Point(0, 0));
});
