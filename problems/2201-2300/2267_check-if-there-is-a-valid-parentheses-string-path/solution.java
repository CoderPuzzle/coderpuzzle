import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean hasValidPath(String[][] grid) {
        // dp[r][c] is the set of balances reachable at that cell, where the
        // balance counts '(' minus ')' along the path. A prefix whose balance
        // ever goes negative can never close into a valid string, so those
        // balances are dropped as each move is extended.
        int m = grid.length,
            n = grid[0].length;
        int start = grid[0][0].equals("(") ? 1 : -1;
        if (start < 0) return false;
        Set<Integer>[][] dp = new HashSet[m][n];
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                dp[r][c] = new HashSet<>();
            }
        }
        dp[0][0].add(start);
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                for (int balance : dp[r][c]) {
                    if (r + 1 < m) {
                        int nb = balance + (grid[r + 1][c].equals("(") ? 1 : -1);
                        if (nb >= 0) dp[r + 1][c].add(nb);
                    }
                    if (c + 1 < n) {
                        int nb = balance + (grid[r][c + 1].equals("(") ? 1 : -1);
                        if (nb >= 0) dp[r][c + 1].add(nb);
                    }
                }
            }
        }
        return dp[m - 1][n - 1].contains(0);
    }
}
