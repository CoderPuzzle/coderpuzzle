class Solution {

    public int maximalSquare(String[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        int best = 0;
        // Two rolling rows of length n + 1: dp[i][j] is the side of the
        // largest all-ones square ending at (i, j); the leading zero column
        // stands in for the out-of-bounds left border.
        int[] prev = new int[n + 1];
        for (int i = 0; i < m; i++) {
            int[] curr = new int[n + 1];
            for (int j = 0; j < n; j++) {
                if (matrix[i][j].equals("1")) {
                    // A square growing out of this corner must fit inside all
                    // three predecessors: up, left, and diagonal — so the
                    // minimum is the binding constraint.
                    curr[j + 1] = Math.min(prev[j], Math.min(prev[j + 1], curr[j])) + 1;
                    if (curr[j + 1] > best) {
                        best = curr[j + 1];
                    }
                }
            }
            prev = curr;
        }
        return best * best;
    }
}
