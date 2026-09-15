import java.util.*;

class Solution {

    public int minimumMoves(int[][] grid) {
        // Pair every empty cell with a cell still holding at least two
        // stones; the cost of a pair is the Manhattan distance between the
        // cells, and backtracking over all donor choices finds the cheapest
        // perfect pairing.
        List<int[]> empties = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (grid[i][j] == 0) {
                    empties.add(new int[] { i, j });
                }
            }
        }
        return fill(grid, empties, 0);
    }

    private int fill(int[][] grid, List<int[]> empties, int k) {
        if (k == empties.size()) {
            return 0;
        }
        int i = empties.get(k)[0];
        int j = empties.get(k)[1];
        int best = 99;
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                if (grid[r][c] >= 2) {
                    grid[r][c]--;
                    best = Math.min(best, Math.abs(i - r) + Math.abs(j - c) + fill(grid, empties, k + 1));
                    grid[r][c]++;
                }
            }
        }
        return best;
    }
}
