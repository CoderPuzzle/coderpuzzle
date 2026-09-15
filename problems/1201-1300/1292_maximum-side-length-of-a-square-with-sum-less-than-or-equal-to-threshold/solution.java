class Solution {

    public int maxSideLength(int[][] mat, int threshold) {
        int m = mat.length;
        int n = mat[0].length;
        // prefix[i][j] = sum of the rectangle from (0,0) to (i-1, j-1)
        long[][] prefix = new long[m + 1][n + 1];
        for (int i = 0; i < m; i++) {
            long[] prow = prefix[i];
            long[] crow = prefix[i + 1];
            int[] row = mat[i];
            for (int j = 0; j < n; j++) {
                crow[j + 1] = crow[j] + prow[j + 1] - prow[j] + row[j];
            }
        }

        // one global answer; each top-left corner only tries to extend it
        int ans = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                // try side ans+1 while it fits the matrix and the threshold;
                // ans never shrinks, so failures cost a single O(1) check and
                // each side length is paid at most once across the scan
                while (i + ans < m && j + ans < n && squareSum(prefix, i, j, ans + 1) <= threshold) {
                    ans += 1;
                }
            }
        }
        return ans;
    }

    // inclusion-exclusion of four corners: any square sum in O(1)
    private long squareSum(long[][] p, int i, int j, int k) {
        return p[i + k][j + k] - p[i][j + k] - p[i + k][j] + p[i][j];
    }
}
