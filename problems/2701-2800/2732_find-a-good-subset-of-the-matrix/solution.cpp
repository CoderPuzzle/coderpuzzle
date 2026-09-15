#include <unordered_map>
#include <vector>

class Solution {
  public:
    vector<int> goodSubsetofBinaryMatrix(vector<vector<int>> &grid) {
        // Each row collapses into an n-bit signature (n <= 5 means at most
        // 32 of them). An all-zero row by itself is a good subset; otherwise
        // the earliest previously stored signature disjoint from the current
        // row completes a size-2 good subset.
        unordered_map<int, int> seen;
        for (int i = 0; i < (int)grid.size(); ++i) {
            int mask = 0;
            for (int j = 0; j < (int)grid[i].size(); ++j) {
                if (grid[i][j] == 1)
                    mask |= 1 << j;
            }
            if (mask == 0)
                return {i};
            for (int other = 0; other < 32; ++other) {
                auto it = seen.find(other);
                if (it != seen.end() && (other & mask) == 0) {
                    return {it->second, i};
                }
            }
            if (!seen.count(mask))
                seen[mask] = i;
        }
        return {};
    }
};
