#include <algorithm>
#include <climits>
#include <cstdlib>
#include <vector>

class Solution {
  public:
    long long maxMatrixSum(vector<vector<int>> &matrix) {
        // Each operation flips two border-adjacent cells, so the parity of
        // the negative count is invariant: an even count makes every value
        // positive, an odd count must leave the smallest-magnitude value
        // negative. Accumulate in long long: 250^2 * 1e5 = 6.25e9 > 2^31.
        long long total = 0;
        int negatives = 0;
        int smallest = INT_MAX;
        for (const vector<int> &row : matrix) {
            for (int value : row) {
                total += abs(value);
                if (value < 0)
                    ++negatives;
                smallest = min(smallest, abs(value));
            }
        }
        if (negatives % 2)
            total -= 2LL * smallest;
        return total;
    }
};
