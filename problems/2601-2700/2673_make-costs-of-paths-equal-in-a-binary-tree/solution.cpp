#include <cstdlib>
#include <vector>

class Solution {
  public:
    // Walk heap indices from the deepest parent up to the root. At each
    // node the two child subtrees must end on a common maximum, so their
    // difference is charged once and the larger combined maximum travels
    // up. Charges accumulate past 2^31, hence the long long accumulator.
    long long minIncrements(int n, std::vector<int> &cost) {
        std::vector<long long> subtree(cost.begin(), cost.end());
        long long total = 0;
        for (int node = n / 2; node >= 1; --node) {
            long long left = subtree[2 * node - 1];
            long long right = subtree[2 * node];
            total += std::abs(left - right);
            subtree[node - 1] = std::max(left, right) + cost[node - 1];
        }
        return total;
    }
};
