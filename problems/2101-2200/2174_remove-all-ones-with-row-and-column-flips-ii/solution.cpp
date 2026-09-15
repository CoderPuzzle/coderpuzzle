#include <algorithm>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int removeOnes(std::vector<std::vector<int>> &grid) {
        // Recursion over "which 1-cell do we clear next" with a memo table
        // keyed on the bitmask of remaining ones. At most 15 cells means at
        // most 2^15 states, each expanded over at most 15 choices.
        int m = static_cast<int>(grid.size());
        int n = static_cast<int>(grid[0].size());
        int state = 0;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j]) {
                    state |= 1 << (i * n + j);
                }
            }
        }
        std::unordered_map<int, int> memo;
        return solve(state, m, n, memo);
    }

  private:
    static int solve(int state, int m, int n, std::unordered_map<int, int> &memo) {
        if (state == 0) {
            return 0;
        }
        auto it = memo.find(state);
        if (it != memo.end()) {
            return it->second;
        }
        int best = m * n + 1;
        for (int cell = 0; cell < m * n; ++cell) {
            if ((state >> cell) & 1) {
                int cleared = state;
                for (int j = 0; j < n; ++j) {
                    cleared &= ~(1 << ((cell / n) * n + j));
                }
                for (int i = 0; i < m; ++i) {
                    cleared &= ~(1 << (i * n + (cell % n)));
                }
                best = std::min(best, 1 + solve(cleared, m, n, memo));
            }
        }
        memo[state] = best;
        return best;
    }
};
