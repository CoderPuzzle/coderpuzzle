import java.util.HashMap;
import java.util.Map;

class Solution {

    public int removeOnes(int[][] grid) {
        // Recursion over "which 1-cell do we clear next" with a memo map
        // keyed on the bitmask of remaining ones. At most 15 cells bounds
        // both the state count and the branching factor per state.
        int m = grid.length;
        int n = grid[0].length;
        Map<Integer, Integer> memo = new HashMap<>();
        return solve(stateOf(grid), m, n, memo);
    }

    private int stateOf(int[][] grid) {
        int state = 0;
        for (int i = 0; i < grid.length; ++i) {
            for (int j = 0; j < grid[0].length; ++j) {
                if (grid[i][j] == 1) {
                    state |= 1 << (i * grid[0].length + j);
                }
            }
        }
        return state;
    }

    private int solve(int state, int m, int n, Map<Integer, Integer> memo) {
        if (state == 0) {
            return 0;
        }
        Integer cached = memo.get(state);
        if (cached != null) {
            return cached;
        }
        int best = m * n + 1;
        for (int cell = 0; cell < m * n; ++cell) {
            if (((state >> cell) & 1) == 0) {
                continue;
            }
            int cleared = state;
            for (int j = 0; j < n; ++j) {
                cleared &= ~(1 << ((cell / n) * n + j));
            }
            for (int i = 0; i < m; ++i) {
                cleared &= ~(1 << (i * n + (cell % n)));
            }
            best = Math.min(best, 1 + solve(cleared, m, n, memo));
        }
        memo.put(state, best);
        return best;
    }
}
