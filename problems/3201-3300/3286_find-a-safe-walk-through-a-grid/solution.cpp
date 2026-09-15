#include <deque>
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
        std::deque<std::pair<int, int>> queue;
        queue.push_back({0, 0});
        while (!queue.empty()) {
            auto [r, c] = queue.front();
            queue.pop_front();
            const int d = dist[r][c];
            if (d > budget) {
                continue;
            }
            if (r == m - 1 && c == n - 1) {
                return true;
            }
            for (auto [dr, dc] : {std::pair{-1, 0}, {1, 0}, {0, -1}, {0, 1}}) {
                int nr = r + dr, nc = c + dc;
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                    continue;
                }
                int nd = d + grid[nr][nc];
                if (nd < dist[nr][nc] && nd <= budget) {
                    dist[nr][nc] = nd;
                    // Free move joins the current layer; a paid move goes to
                    // the back so layers stay ordered.
                    if (grid[nr][nc] == 1) {
                        queue.push_back({nr, nc});
                    } else {
                        queue.push_front({nr, nc});
                    }
                }
            }
        }
        return false;
    }
};
