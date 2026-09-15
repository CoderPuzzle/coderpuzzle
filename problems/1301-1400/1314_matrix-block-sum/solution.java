class Solution {

    public int[][] matrixBlockSum(int[][] mat, int k) {
        int m = mat.length,
            n = mat[0].length;
        // prefix[i+1][j+1] = sum of the rectangle (0,0)..(i,j); the extra zero
        // row and column remove all boundary special-casing.
        int[][] prefix = new int[m + 1][n + 1];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                // Two-dimensional inclusion-exclusion: add above + left,
                // subtract the doubly-counted corner, add the cell.
                prefix[i + 1][j + 1] = prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j] + mat[i][j];
            }
        }
        int[][] answer = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                // Clamp the (i-k..i+k) window to the grid and convert it to
                // the half-open [r1,r2) x [c1,c2) form the table supports —
                // border cells just query a smaller rectangle.
                int r1 = Math.max(0, i - k),
                    r2 = Math.min(m, i + k + 1);
                int c1 = Math.max(0, j - k),
                    c2 = Math.min(n, j + k + 1);
                // Four lookups with alternating signs: O(1) for any k.
                answer[i][j] = prefix[r2][c2] - prefix[r1][c2] - prefix[r2][c1] + prefix[r1][c1];
            }
        }
        return answer;
    }
}
