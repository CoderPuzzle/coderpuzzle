#include <functional>
#include <queue>
#include <tuple>
#include <utility>
#include <vector>

class Solution {
  public:
    bool findSafeWalk(std::vector<std::vector<int>> &grid, int health) {
        // A path's cost is the number of unsafe cells it enters, and both
        // endpoints are entered — so grid[0][0] charges immediately. The
        // walk is safe iff some path costs at most health - 1.
        const int budget = health - 1;
        const int m = static_cast<int>(grid.size());
        const int n = static_cast<int>(grid[0].size());
        constexpr int kInf = 50 * 50 + 1;
        std::vector<std::vector<int>> dist(m, std::vector<int>(n, kInf));
        dist[0][0] = grid[0][0];
        std::priority_queue<std::tuple<int, int, int>, std::vector<std::tuple<int, int, int>>,
                            std::greater<std::tuple<int, int, int>>>
            heap;
        heap.emplace(grid[0][0], 0, 0);
        while (!heap.empty()) {
            auto [d, r, c] = heap.top();
            heap.pop();
            // The first time the goal is popped its cost is optimal.
            if (r == m - 1 && c == n - 1) {
                return d <= budget;
            }
            // Stale-entry guard: skip outdated heap records.
            if (d > dist[r][c]) {
                continue;
            }
            for (auto [dr, dc] : {std::pair{-1, 0}, {1, 0}, {0, -1}, {0, 1}}) {
                int nr = r + dr, nc = c + dc;
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                    continue;
                }
                int nd = d + grid[nr][nc];
                // Relax only when the unsafe count strictly improves.
                if (nd < dist[nr][nc]) {
                    dist[nr][nc] = nd;
                    heap.emplace(nd, nr, nc);
                }
            }
        }
        return false;
    }
};
