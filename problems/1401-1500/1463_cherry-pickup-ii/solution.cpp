class Solution {
  public:
    int cherryPickup(vector<vector<int>> &grid) {
        int rows = grid.size();
        int cols = grid[0].size();
        const int NEG = INT_MIN / 2;
        // both robots drop one row per step, so the state is just the column
        // pair; unreachable states stay at NEG and never win a max
        vector<vector<int>> dp(cols, vector<int>(cols, NEG));
        // row 0 starts: robot 1 leftmost, robot 2 rightmost; a one-column
        // grid has both share the start cell, counted once
        dp[0][cols - 1] = grid[0][0] + (cols > 1 ? grid[0][cols - 1] : 0);
        for (int r = 1; r < rows; r++) {
            vector<vector<int>> ndp(cols, vector<int>(cols, NEG));
            for (int c1 = 0; c1 < cols; c1++) {
                for (int c2 = 0; c2 < cols; c2++) {
                    // best of the 9 predecessor column pairs (each robot
                    // steps by -1, 0, or +1 between rows)
                    int best = NEG;
                    for (int d1 = -1; d1 <= 1; d1++) {
                        for (int d2 = -1; d2 <= 1; d2++) {
                            int p1 = c1 + d1;
                            int p2 = c2 + d2;
                            if (p1 >= 0 && p1 < cols && p2 >= 0 && p2 < cols && dp[p1][p2] > best) {
                                best = dp[p1][p2];
                            }
                        }
                    }
                    if (best > NEG) {
                        // both cells harvested, except a shared cell counts once
                        ndp[c1][c2] = best + grid[r][c1] + (c1 != c2 ? grid[r][c2] : 0);
                    }
                }
            }
            dp = move(ndp);
        }
        // every move is strictly downward, so all paths reach the bottom row
        // together — the answer is the best entry of the last table
        int ans = NEG;
        for (int c1 = 0; c1 < cols; c1++) {
            for (int c2 = 0; c2 < cols; c2++) {
                ans = max(ans, dp[c1][c2]);
            }
        }
        return ans;
    }
};
