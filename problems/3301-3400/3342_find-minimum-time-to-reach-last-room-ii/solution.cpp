#include <climits>
#include <queue>
#include <tuple>
#include <vector>

class Solution {
  public:
    int minTimeToReach(vector<vector<int>> &moveTime) {
        // Every move flips the parity of i + j, so a walk that has made
        // k moves always stands on a cell with the parity of k — the
        // hint's (cell, move-parity) states collapse onto the cells
        // alone, and the move leaving (i, j) costs 1 when (i + j) is
        // even, else 2. That fixes each cell's outgoing cost, so plain
        // Dijkstra applies: a cell settled at time t offers a neighbour
        // arrival max(t, moveTime[next]) + cost_out(cell), and the
        // first settle is final. Distances are carried in 64-bit long
        // longs — moveTime reaches 1e9 and the move sums add ~3000.
        int n = moveTime.size(), m = moveTime[0].size();
        vector<vector<long long>> dist(n, vector<long long>(m, LLONG_MAX));
        priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>,
                       greater<tuple<long long, int, int>>>
            heap;
        dist[0][0] = 0;
        heap.push({0LL, 0, 0});
        while (!heap.empty()) {
            auto [t, i, j] = heap.top();
            heap.pop();
            if (t > dist[i][j])
                continue;
            long long step = (i + j) % 2 == 0 ? 1LL : 2LL;
            static const int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
            for (auto &d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni < 0 || ni >= n || nj < 0 || nj >= m)
                    continue;
                long long gate = moveTime[ni][nj];
                long long nt = (t > gate ? t : gate) + step;
                if (nt < dist[ni][nj]) {
                    dist[ni][nj] = nt;
                    heap.push({nt, ni, nj});
                }
            }
        }
        return static_cast<int>(dist[n - 1][m - 1]);
    }
};
