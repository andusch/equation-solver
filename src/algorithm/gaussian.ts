export interface Step {
  operation: string; // human-readable row operation
  matrix: number[][];
}

export function gaussian(A: number[][], b: number[]) {
  const n = A.length;
  const M = A.map((row, i) => [...row, b[i]]); // augmented matrix
  const steps: Step[] = [];

  // Forward elimination
  for (let i = 0; i < n; i++) {
    // pivot
    let max = i;
    for (let k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[max][i])) max = k;
    if (max !== i) {
      [M[i], M[max]] = [M[max], M[i]];
      steps.push({ operation: `R${i + 1} ↔ R${max + 1}`, matrix: copy(M) });
    }

    // eliminate below
    for (let k = i + 1; k < n; k++) {
      if (M[i][i] === 0) continue;
      const f = M[k][i] / M[i][i];
      for (let j = i; j <= n; j++) M[k][j] -= f * M[i][j];
      steps.push({ operation: `R${k + 1} ← R${k + 1} - ${f.toFixed(2)}R${i + 1}`, matrix: copy(M) });
    }
  }

  // Back-substitution
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = M[i][n];
    for (let j = i + 1; j < n; j++) x[i] -= M[i][j] * x[j];
    x[i] /= M[i][i];
  }

  return { steps, solution: x };

  function copy(m: number[][]) {
    return m.map(r => [...r]);
  }
}