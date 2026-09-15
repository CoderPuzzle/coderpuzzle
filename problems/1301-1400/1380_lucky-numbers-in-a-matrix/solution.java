import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public List<Integer> luckyNumbers(int[][] matrix) {
        int m = matrix.length,
            n = matrix[0].length;
        int[] rowMin = new int[m];
        for (int r = 0; r < m; r++) {
            int best = Integer.MAX_VALUE;
            for (int v : matrix[r]) best = Math.min(best, v);
            rowMin[r] = best;
        }
        int[] colMax = new int[n];
        for (int c = 0; c < n; c++) {
            int best = Integer.MIN_VALUE;
            for (int[] row : matrix) best = Math.max(best, row[c]);
            colMax[c] = best;
        }
        List<Integer> lucky = new ArrayList<>();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == rowMin[r] && matrix[r][c] == colMax[c]) {
                    lucky.add(matrix[r][c]);
                }
            }
        }
        Collections.sort(lucky);
        return lucky;
    }
}
