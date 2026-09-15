import java.util.*;

class Solution {

    // Child 1 is pinned to the main diagonal. Children 2 and 3 each
    // walk their own off-diagonal triangle in n-1 steps (their row /
    // column advances one per move, and the diagonal can only be
    // touched by spending every later move on it, which collects
    // nothing), so solve them independently; diagonal cells and the
    // shared final cell are counted once, via the diagonal. Child 3 is
    // child 2 with the grid transposed (swapped reads).
    public long maxCollectedFruits(int[][] fruits) {
        int n = fruits.length;
        long total = 0;
        for (int i = 0; i < n; i++) {
            total += fruits[i][i];
        }
        total += triangle(fruits, false);
        total += triangle(fruits, true);
        return total;
    }

    // Best walk from the top-right corner, one row per step, staying
    // strictly right of the diagonal, final cell excluded (-1 marks
    // not-yet-reachable cells; values >= 0).
    private long triangle(int[][] m, boolean swapped) {
        int n = m.length;
        long[] prev = new long[n];
        Arrays.fill(prev, -1);
        prev[n - 1] = swapped ? m[n - 1][0] : m[0][n - 1];
        for (int i = 1; i < n - 1; i++) {
            long[] cur = new long[n];
            Arrays.fill(cur, -1);
            for (int j = i + 1; j < n; j++) {
                long best = prev[j - 1];
                if (prev[j] > best) {
                    best = prev[j];
                }
                if (j + 1 < n && prev[j + 1] > best) {
                    best = prev[j + 1];
                }
                if (best >= 0) {
                    cur[j] = best + (swapped ? m[j][i] : m[i][j]);
                }
            }
            prev = cur;
        }
        return prev[n - 1];
    }
}
