class Solution {
  public:
    int maxDistance(vector<vector<int>> &grid) {
        int n = grid.size();
        // copy so the input is not mutated; the copy doubles as visited marks
        vector<vector<int>> g = grid;
        queue<pair<int, int>> q;
        // multi-source BFS: every land cell starts at distance 0, so the
        // first wavefront arrival is exactly each cell's nearest-land distance
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (g[i][j] == 1) {
                    q.push({i, j});
                }
            }
        }
        // all water (empty seed) or all land: no distance exists
        if (q.empty() || (int)q.size() == n * n) {
            return -1;
        }
        int dist = 0;
        // 4-directional steps match Manhattan distance on this grid
        int di[4] = {1, -1, 0, 0};
        int dj[4] = {0, 0, 1, -1};
        while (!q.empty()) {
            // expand one full level per round; dist counts levels processed
            dist++;
            for (int sz = q.size(); sz > 0; sz--) {
                auto [i, j] = q.front();
                q.pop();
                for (int d = 0; d < 4; d++) {
                    int ni = i + di[d];
                    int nj = j + dj[d];
                    if (ni >= 0 && ni < n && nj >= 0 && nj < n && g[ni][nj] == 0) {
                        // flip to 1 on enqueue: each cell is queued once
                        g[ni][nj] = 1;
                        q.push({ni, nj});
                    }
                }
            }
        }
        // the last round absorbed nothing new, so the deepest level is dist-1
        return dist - 1;
    }
};
