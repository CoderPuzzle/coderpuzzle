class Solution {

    public int[][] matrixReshape(int[][] mat, int r, int c) {
        // A reshape can only permute elements, never create or destroy them,
        // so the target is legal exactly when the areas agree; any mismatch
        // returns the original matrix untouched.
        int m = mat.length,
            n = mat[0].length;
        if (r * c != m * n) {
            return mat;
        }
        int[][] reshaped = new int[r][c];
        // One flat index drives both sides: element i sits at mat[i / n][i % n]
        // in the source and belongs at reshaped[i / c][i % c] in the target,
        // so reading i = 0 .. m*n - 1 fills the target in row-traversing order.
        for (int i = 0; i < m * n; ++i) {
            reshaped[i / c][i % c] = mat[i / n][i % n];
        }
        return reshaped;
    }
}
