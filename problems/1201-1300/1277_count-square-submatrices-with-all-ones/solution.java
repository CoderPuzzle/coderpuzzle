class Solution {

    public int countSquares(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        int total = 0;
        // dp rows: side of the largest all-ones square whose bottom-right
        // corner sits at each cell; only the previous row is ever needed
        int[] prev = new int[n];
        int[] cur = new int[n];
        for (int i = 0; i < m; i++) {
            java.util.Arrays.fill(cur, 0);
            for (int j = 0; j < n; j++) {
                // a 0 cell ends no square; entry stays 0
                if (matrix[i][j] == 0) continue;
                if (i == 0 || j == 0) {
                    // no room to extend past the matrix edge
                    cur[j] = 1;
                } else {
                    // limited by the three neighbors: above, left, diagonal
                    cur[j] = Math.min(prev[j], Math.min(cur[j - 1], prev[j - 1])) + 1;
                }
                // a corner of max side k covers all k nested squares ending
                // there, so summing dp values counts every square exactly once
                total += cur[j];
            }
            int[] tmp = prev;
            prev = cur;
            cur = tmp;
        }
        return total;
    }
}
