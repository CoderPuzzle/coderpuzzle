import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int largestIsland(int[][] grid) {
        int n = grid.length;
        // Label each 4-connected island with a distinct color and
        // record its size; marking cells as they are pushed finds each
        // island exactly once.
        int[][] label = new int[n][n];
        Map<Integer, Integer> sizes = new HashMap<>();

        int color = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1 && label[i][j] == 0) {
                    color++;
                    sizes.put(color, flood(grid, label, n, i, j, color));
                }
            }
        }

        // Best starts at the largest existing island — also the answer
        // when the grid is all 1s and no 0 exists to flip.
        int best = 0;
        for (int value : sizes.values()) {
            best = Math.max(best, value);
        }
        int[] di = { 1, -1, 0, 0 };
        int[] dj = { 0, 0, 1, -1 };
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) {
                    // Dedup matters: one island can touch this 0 on
                    // several sides, and counting it twice would
                    // overstate the merge.
                    boolean[] seen = new boolean[color + 1];
                    int total = 1;
                    for (int d = 0; d < 4; d++) {
                        int ni = i + di[d];
                        int nj = j + dj[d];
                        if (ni >= 0 && ni < n && nj >= 0 && nj < n && label[ni][nj] != 0) {
                            int c = label[ni][nj];
                            if (!seen[c]) {
                                seen[c] = true;
                                total += sizes.get(c);
                            }
                        }
                    }
                    best = Math.max(best, total);
                }
            }
        }
        return best;
    }

    private int flood(int[][] grid, int[][] label, int n, int si, int sj, int color) {
        int count = 0;
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[] { si, sj });
        label[si][sj] = color;
        int[] di = { 1, -1, 0, 0 };
        int[] dj = { 0, 0, 1, -1 };
        while (!stack.isEmpty()) {
            int[] top = stack.pop();
            int i = top[0];
            int j = top[1];
            count++;
            for (int d = 0; d < 4; d++) {
                int ni = i + di[d];
                int nj = j + dj[d];
                if (ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] == 1 && label[ni][nj] == 0) {
                    label[ni][nj] = color;
                    stack.push(new int[] { ni, nj });
                }
            }
        }
        return count;
    }
}
