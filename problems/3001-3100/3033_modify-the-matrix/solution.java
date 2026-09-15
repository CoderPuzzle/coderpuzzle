class Solution {

    public int[][] modifiedMatrix(int[][] matrix) {
        // Each column holds at least one non-negative value, so the plain
        // column maximum is never the -1 sentinel itself and is exactly
        // what every -1 of that column should become.
        int m = matrix.length;
        int n = matrix[0].length;
        int[][] answer = new int[m][];
        for (int i = 0; i < m; ++i) {
            answer[i] = matrix[i].clone();
        }
        for (int j = 0; j < n; ++j) {
            int best = matrix[0][j];
            for (int i = 1; i < m; ++i) {
                best = Math.max(best, matrix[i][j]);
            }
            for (int i = 0; i < m; ++i) {
                if (answer[i][j] == -1) {
                    answer[i][j] = best;
                }
            }
        }
        return answer;
    }
}
