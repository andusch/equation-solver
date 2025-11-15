import { gaussian } from '../gaussian';

describe('gaussian', () => {
  it('solves 2×2 system', () => {
    const A = [
      [1, 2],
      [4, 5],
    ];
    const b = [3, 6];
    const { steps, solution } = gaussian(A, b);
    expect(steps).toHaveLength(2); // at least 2 row ops
    expect(solution).toBeCloseToArray([-1, 2]); // x=-1, y=2
  });
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCloseToArray(expected: number[]): R;
    }
  }
}

expect.extend({
  toBeCloseToArray(received: number[], expected: number[]) {
    const pass = received.every((v, i) => Math.abs(v - expected[i]) < 1e-6);
    return {
      message: () => `expected ${received} to be close to ${expected}`,
      pass,
    };
  },
});