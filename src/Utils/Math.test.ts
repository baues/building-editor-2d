import { round } from './Math';

describe("Math", () => {
    test('round', () => {
        expect(round(123.4567, 4)).toBe(123.4567);
        expect(round(123.4567, 2)).toBe(123.46);
        expect(round(123.4567, 0)).toBe(123);
        expect(round(123.4567, -2)).toBe(100);
    });
});