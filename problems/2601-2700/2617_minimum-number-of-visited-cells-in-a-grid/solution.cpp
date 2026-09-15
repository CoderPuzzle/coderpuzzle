#include <algorithm>
#include <climits>
#include <queue>
#include <utility>
#include <vector>

class Solution {
  public:
    int minimumVisitedCells(vector<vector<int>> &grid) {
        // Every move goes strictly right or down, so row-major order is a
        // topological order: when a cell is reached its distance is final.
        // Two lazy min-heaps answer "nearest predecessor" in O(log n):
        // rows[i] holds {dis, k} for cells settled in row i and cols[j]
        // likewise down column j. Entries whose reach no longer covers the
        // current index pop forever — the scan index only ever grows — so
        // the surviving top is the best available source from that side.
        using Entry = pair<long long, int>;
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<long long>> dis(m, vector<long long>(n, LLONG_MAX));
        dis[0][0] = 1;
        vector<priority_queue<Entry, vector<Entry>, greater<Entry>>> rows(m);
        vector<priority_queue<Entry, vector<Entry>, greater<Entry>>> cols(n);
        rows[0].push({1, 0});
        cols[0].push({1, 0});
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0)
                    continue;
                while (!rows[i].empty() && grid[i][rows[i].top().second] + rows[i].top().second < j)
                    rows[i].pop();
                while (!cols[j].empty() && grid[cols[j].top().second][j] + cols[j].top().second < i)
                    cols[j].pop();
                long long nearest = min(rows[i].empty() ? LLONG_MAX : rows[i].top().first,
                                        cols[j].empty() ? LLONG_MAX : cols[j].top().first);
                if (nearest != LLONG_MAX) {
                    dis[i][j] = nearest + 1;
                    rows[i].push({nearest + 1, j});
                    cols[j].push({nearest + 1, i});
                }
            }
        }
        return dis[m - 1][n - 1] == LLONG_MAX ? -1 : static_cast<int>(dis[m - 1][n - 1]);
    }
};
