function matrixReshape(mat: number[][], r: number, c: number): number[][] {
    // A reshape can only permute elements, never create or destroy them,
    // so the target is legal exactly when the areas agree; any mismatch
    // returns the original matrix untouched.
    const m = mat.length;
    const n = mat[0].length;
    if (r * c !== m * n) {
        return mat;
    }
    const reshaped: number[][] = Array.from({ length: r }, () => new Array(c).fill(0));
    // One flat index drives both sides: element i sits at mat[i / n][i % n]
    // in the source and belongs at reshaped[i / c][i % c] in the target,
    // so reading i = 0 .. m*n - 1 fills the target in row-traversing order.
    for (let i = 0; i < m * n; ++i) {
        reshaped[Math.floor(i / c)][i % c] = mat[Math.floor(i / n)][i % n];
    }
    return reshaped;
}
