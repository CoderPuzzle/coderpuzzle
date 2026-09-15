import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numSubmatrixSumTarget(int[][] matrix, int target) {
        int rows = matrix.length;
        int cols = matrix[0].length;

        int[][] vpref = new int[rows + 1][cols];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                vpref[r + 1][c] = vpref[r][c] + matrix[r][c];
            }
        }

        int count = 0;
        for (int top = 0; top < rows; top++) {
            for (int bottom = top; bottom < rows; bottom++) {
                Map<Integer, Integer> hist = new HashMap<>();
                hist.put(0, 1);
                int running = 0;
                for (int c = 0; c < cols; c++) {
                    int colSum = vpref[bottom + 1][c] - vpref[top][c];
                    running += colSum;
                    Integer prev = hist.get(running - target);
                    if (prev != null) count += prev;
                    hist.merge(running, 1, Integer::sum);
                }
            }
        }
        return count;
    }
}
