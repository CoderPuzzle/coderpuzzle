class Solution {
  public:
    int minCost(vector<vector<int>> &grid) {
        // Every cell value is at most 1023 (10 bits), so any path XOR is in
        // 0..1023. Each cell carries a bitset of reachable XOR values.
        int m = grid.size(), n = grid[0].size();
        vector<vector<bitset<1024>>> reach(m, vector<bitset<1024>>(n));
        reach[0][0].set(grid[0][0]);
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                int v = grid[i][j];
                bitset<1024> shifted;
                for (int x = 0; x < 1024; x++) {
                    if ((i > 0 && reach[i - 1][j].test(x)) || (j > 0 && reach[i][j - 1].test(x))) {
                        shifted.set(x ^ v);
                    }
                }
                reach[i][j] = shifted;
            }
        }
        // The smallest reachable XOR at the bottom-right cell is the answer.
        for (int x = 0; x < 1024; x++) {
            if (reach[m - 1][n - 1].test(x)) {
                return x;
            }
        }
        return -1;
    }
};
