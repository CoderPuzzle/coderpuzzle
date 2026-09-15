#include <cstdlib>
#include <vector>

class Solution {
  public:
    std::vector<int> bestTower(std::vector<std::vector<int>> &towers, std::vector<int> &center, int radius) {
        int cx = center[0], cy = center[1];
        std::vector<int> best;
        int bestQuality = -1;
        for (const auto &tower : towers) {
            int x = tower[0], y = tower[1], quality = tower[2];
            if (std::abs(x - cx) + std::abs(y - cy) > radius) {
                continue;
            }
            // Strictly better quality wins; on a quality tie the
            // lexicographically smaller coordinate wins.
            if (best.empty() || quality > bestQuality ||
                (quality == bestQuality && (x < best[0] || (x == best[0] && y < best[1])))) {
                best = {x, y};
                bestQuality = quality;
            }
        }
        if (best.empty()) {
            return {-1, -1};
        }
        return best;
    }
};
