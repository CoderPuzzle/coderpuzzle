import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int longestIncreasingPath(int[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) {
            return 0;
        }
        int m = matrix.length,
            n = matrix[0].length;
        // memo[i][j] = longest ascending walk starting at (i, j); 0 means
        // "not computed yet".
        int[][] memo = new int[m][n];
        int[] di = { 1, -1, 0, 0 };
        int[] dj = { 0, 0, 1, -1 };
        int best = 0;
        for (int si = 0; si < m; si++) {
            for (int sj = 0; sj < n; sj++) {
                if (memo[si][sj] != 0) {
                    continue;
                }
                // The DFS call stack, made explicit: each frame is
                // {row, column, next direction}. A frame pops once all
                // four directions have been explored.
                Deque<int[]> stack = new ArrayDeque<>();
                stack.push(new int[] { si, sj, 0 });
                while (!stack.isEmpty()) {
                    int[] frame = stack.peek();
                    int i = frame[0],
                        j = frame[1],
                        k = frame[2];
                    if (k == 0) {
                        // First visit: the cell on its own is a walk of 1.
                        memo[i][j] = 1;
                    }
                    if (k == 4) {
                        // Every larger neighbour has been absorbed, so the
                        // frame's value is final: report it and hand it to
                        // the frame below (the cell that descended here).
                        stack.pop();
                        best = Math.max(best, memo[i][j]);
                        if (!stack.isEmpty()) {
                            int[] parent = stack.peek();
                            memo[parent[0]][parent[1]] = Math.max(memo[parent[0]][parent[1]], memo[i][j] + 1);
                        }
                        continue;
                    }
                    int ni = i + di[k],
                        nj = j + dj[k];
                    frame[2]++;
                    // Only strictly larger neighbours continue the walk.
                    if (ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] > matrix[i][j]) {
                        if (memo[ni][nj] == 0) {
                            stack.push(new int[] { ni, nj, 0 });
                        } else {
                            // Finished earlier — its memo is final already.
                            memo[i][j] = Math.max(memo[i][j], memo[ni][nj] + 1);
                        }
                    }
                }
            }
        }
        return best;
    }
}
