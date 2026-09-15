function multiply(mat1: number[][], mat2: number[][]): number[][] {
    const m = mat1.length;
    const k = mat2.length;
    const n = mat2[0].length;
    // For each row of mat2, the (column, value) pairs that are nonzero —
    // the only entries a nonzero mat1 cell can ever pair with.
    const nonzero2: [number, number][][] = [];
    for (let p = 0; p < k; ++p) {
        const pairs: [number, number][] = [];
        for (let j = 0; j < n; ++j) {
            if (mat2[p][j] !== 0) {
                pairs.push([j, mat2[p][j]]);
            }
        }
        nonzero2.push(pairs);
    }
    const result: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    // A zero in mat1 wipes a whole row of products; skip it instead of
    // multiplying every mat2 entry by zero.
    for (let i = 0; i < m; ++i) {
        for (let p = 0; p < k; ++p) {
            const value = mat1[i][p];
            if (value === 0) {
                continue;
            }
            for (const [j, other] of nonzero2[p]) {
                result[i][j] += value * other;
            }
        }
    }
    return result;
}
