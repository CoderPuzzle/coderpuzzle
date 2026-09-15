#include <climits>
#include <queue>
#include <tuple>
#include <vector>

class Solution {
  public:
    int minTimeToReach(vector<vector<int>> &moveTime) {
        // Waiting inside a room is free, but a move into an adjacent room
        // takes exactly one second and cannot start before the target
        // room opens, so a cell settled at time t settles a neighbour at
        // max(t, moveTime[next]) + 1. That relaxation never lowers a
        // settled time, so this is shortest-path terrain for Dijkstra:
        // pop cells from a min-heap of arrival times, skip stale entries,
        // and the first settle of a cell is its final time.
        int n = moveTime.size(), m = moveTime[0].size();
        vector<vector<int>> dist(n, vector<int>(m, INT_MAX));
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> heap;
        dist[0][0] = 0;
        heap.push({0, 0, 0});
        while (!heap.empty()) {
            auto [t, i, j] = heap.top();
            heap.pop();
            if (t > dist[i][j])
                continue;
            static const int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
            for (auto &d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni < 0 || ni >= n || nj < 0 || nj >= m)
                    continue;
                int nt = max(t, moveTime[ni][nj]) + 1;
                if (nt < dist[ni][nj]) {
                    dist[ni][nj] = nt;
                    heap.push({nt, ni, nj});
                }
            }
        }
        return dist[n - 1][m - 1];
    }
};
