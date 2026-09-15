class Solution {

    public int maxSumSubmatrix(int[][] matrix, int k) {
        int m = matrix.length;
        int n = matrix[0].length;
        // prefix[r][c] = sum of the r x c rectangle in the top-left corner;
        // any block is four lookups against this table.
        int[][] prefix = new int[m + 1][n + 1];
        for (int r = 1; r <= m; r++) {
            for (int c = 1; c <= n; c++) {
                prefix[r][c] = prefix[r - 1][c] + prefix[r][c - 1] - prefix[r - 1][c - 1] + matrix[r - 1][c - 1];
            }
        }
        // Walk every block by its four corner coordinates and keep the
        // largest total that respects the cap.
        int best = Integer.MIN_VALUE;
        for (int top = 0; top < m; top++) {
            for (int bottom = top; bottom < m; bottom++) {
                for (int left = 0; left < n; left++) {
                    int[] pt = prefix[top];
                    int[] pb = prefix[bottom + 1];
                    for (int right = left; right < n; right++) {
                        int total = pb[right + 1] - pt[right + 1] - pb[left] + pt[left];
                        if (total <= k) {
                            best = Math.max(best, total);
                        }
                    }
                }
            }
        }
        return best;
    }
}
