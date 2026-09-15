class Solution {
  public:
    int minCost(vector<vector<int>> &grid) {
        int m = grid.size();
        int n = grid[0].size();
        int di[4] = {0, 0, 1, -1};
        int dj[4] = {1, -1, 0, 0};
        vector<vector<int>> dist(m, vector<int>(n, INT_MAX));
        dist[0][0] = 0;
        // Shortest path over cells: each move costs 0 when the cell's sign
        // points at that neighbor and 1 otherwise (the price of rewriting it).
        // Plain Dijkstra: a binary heap yields the smallest tentative distance
        // on every pop, whatever the weights are.
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> heap;
        heap.emplace(0, 0, 0);
        while (!heap.empty()) {
            auto [d, i, j] = heap.top();
            heap.pop();
            // The first pop of a cell settles its distance for good.
            if (i == m - 1 && j == n - 1) {
                return d;
            }
            // Stale-entry guard: skip outdated heap records.
            if (d > dist[i][j]) {
                continue;
            }
            for (int s = 1; s <= 4; s++) {
                int ni = i + di[s - 1];
                int nj = j + dj[s - 1];
                // Bounds check drops signs pointing off the grid.
                if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
                    int cost = grid[i][j] == s ? 0 : 1;
                    // Relax only when the rewrite price strictly improves.
                    if (d + cost < dist[ni][nj]) {
                        dist[ni][nj] = d + cost;
                        heap.emplace(d + cost, ni, nj);
                    }
                }
            }
        }
        return dist[m - 1][n - 1];
    }
};
