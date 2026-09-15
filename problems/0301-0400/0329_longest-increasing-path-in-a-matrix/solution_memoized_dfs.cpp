class Solution {
  public:
    int longestIncreasingPath(vector<vector<int>> &matrix) {
        if (matrix.empty() || matrix[0].empty()) {
            return 0;
        }
        int m = (int)matrix.size(), n = (int)matrix[0].size();
        // memo[i][j] = longest ascending walk starting at (i, j); 0 means
        // "not computed yet".
        vector<vector<int>> memo(m, vector<int>(n, 0));
        const int di[4] = {1, -1, 0, 0};
        const int dj[4] = {0, 0, 1, -1};
        int best = 0;
        for (int si = 0; si < m; si++) {
            for (int sj = 0; sj < n; sj++) {
                if (memo[si][sj] != 0) {
                    continue;
                }
                // The DFS call stack, made explicit: each frame is
                // {row, column, next direction to try}. A frame pops once
                // all four directions have been explored.
                vector<array<int, 3>> stack = {{si, sj, 0}};
                while (!stack.empty()) {
                    auto &frame = stack.back();
                    int i = frame[0], j = frame[1], k = frame[2];
                    if (k == 0) {
                        // First visit: the cell on its own is a walk of 1.
                        memo[i][j] = 1;
                    }
                    if (k == 4) {
                        // Every larger neighbour has been absorbed, so the
                        // frame's value is final: report it and hand it to
                        // the frame below (the cell that descended here).
                        stack.pop_back();
                        best = max(best, memo[i][j]);
                        if (!stack.empty()) {
                            auto &parent = stack.back();
                            memo[parent[0]][parent[1]] = max(memo[parent[0]][parent[1]], memo[i][j] + 1);
                        }
                        continue;
                    }
                    int ni = i + di[k], nj = j + dj[k];
                    frame[2]++;
                    // Only strictly larger neighbours continue the walk.
                    if (ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] > matrix[i][j]) {
                        if (memo[ni][nj] == 0) {
                            stack.push_back({ni, nj, 0});
                        } else {
                            // Finished earlier — its memo is final already.
                            memo[i][j] = max(memo[i][j], memo[ni][nj] + 1);
                        }
                    }
                }
            }
        }
        return best;
    }
};
