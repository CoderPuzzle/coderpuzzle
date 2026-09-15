#include <unordered_map>
#include <vector>

class Solution {
  public:
    int buildWall(int height, int width, std::vector<int> &bricks) {
        // A row is fully described by its internal-joint bitmask; adjacent
        // rows must be disjoint. Enumerate row masks once, then run one
        // vector-of-counts transition per row.
        static const long long MOD = 1000000007LL;
        std::vector<int> masks;
        std::vector<int> current;
        struct Rec {
            static void go(int position, int width, const std::vector<int> &bricks, int mask, std::vector<int> &masks) {
                if (position == width) {
                    masks.push_back(mask);
                    return;
                }
                for (int brick : bricks) {
                    if (position + brick > width) {
                        continue;
                    }
                    int next = position + brick;
                    int extra = next < width ? (1 << (next - 1)) : 0;
                    go(next, width, bricks, mask | extra, masks);
                }
            }
        };
        Rec::go(0, width, bricks, 0, masks);
        if (masks.empty()) {
            return 0;
        }
        std::unordered_map<int, long long> counts;
        for (int mask : masks) {
            counts[mask] = 1;
        }
        for (int row = 1; row < height; ++row) {
            std::unordered_map<int, long long> nextCounts;
            for (int below : masks) {
                long long total = 0;
                for (int above : masks) {
                    if ((above & below) == 0) {
                        total += counts[above];
                    }
                }
                nextCounts[below] = total % MOD;
            }
            counts = std::move(nextCounts);
        }
        long long answer = 0;
        for (auto &entry : counts) {
            answer = (answer + entry.second) % MOD;
        }
        return static_cast<int>(answer);
    }
};
