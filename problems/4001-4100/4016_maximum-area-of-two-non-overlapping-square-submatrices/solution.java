class Solution {

    public int maxArea(int[][] mat) {
        int m = mat.length,
            n = mat[0].length;
        // prefix[i][j] = usable cells in mat[0..i)[0..j): any k-square's fill
        // is then four lookups, so "all ones" is an O(1) test.
        int[][] prefix = new int[m + 1][n + 1];
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                prefix[i + 1][j + 1] = prefix[i + 1][j] + prefix[i][j + 1] - prefix[i][j] + mat[i][j];
            }
        }
        // Binary search the largest feasible side; area is side squared.
        int lo = 0,
            hi = Math.min(m, n);
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            if (hasDisjointPair(mat, prefix, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo * lo;
    }

    // A disjoint pair exists iff the valid corners span >= k rows or >= k
    // columns: extreme-row corners give disjoint row ranges, and if both
    // spans are < k every pair of squares intersects. The same corner twice
    // spans 0 < k, so it never counts as a pair.
    private boolean hasDisjointPair(int[][] mat, int[][] prefix, int k) {
        int m = mat.length,
            n = mat[0].length;
        int minRow = m + n,
            minCol = m + n;
        int maxRow = -1,
            maxCol = -1;
        for (int r = 0; r + k <= m; ++r) {
            for (int c = 0; c + k <= n; ++c) {
                if (prefix[r + k][c + k] - prefix[r][c + k] - prefix[r + k][c] + prefix[r][c] == k * k) {
                    if (r < minRow) minRow = r;
                    if (r > maxRow) maxRow = r;
                    if (c < minCol) minCol = c;
                    if (c > maxCol) maxCol = c;
                }
            }
        }
        if (maxRow < 0) return false;
        return maxRow - minRow >= k || maxCol - minCol >= k;
    }
}
