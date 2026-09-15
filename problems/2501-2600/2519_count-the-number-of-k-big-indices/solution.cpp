#include <algorithm>
#include <vector>

namespace {
// Counts, for every index, how many strictly smaller values sit before it,
// walking one Fenwick tree over the value range.
std::vector<int> smallerCounts(const std::vector<int> &values) {
    int bound = *std::max_element(values.begin(), values.end());
    std::vector<int> tree(bound + 1, 0);
    std::vector<int> counts(values.size(), 0);
    for (int i = 0; i < (int)values.size(); ++i) {
        for (int j = values[i] - 1; j > 0; j -= j & -j)
            counts[i] += tree[j];
        for (int j = values[i]; j <= bound; j += j & -j)
            tree[j] += 1;
    }
    return counts;
}
} // namespace

class Solution {
  public:
    int kBigIndices(std::vector<int> &nums, int k) {
        // Two Fenwick sweeps over the value range answer, for every index,
        // how many strictly smaller values sit on each side: a forward
        // pass fills the left counts and a backward pass reruns the same
        // helper on a fresh tree for the right ones. An index is k-big
        // exactly when both counts reach k.
        std::vector<int> left = smallerCounts(nums);
        std::vector<int> reversed(nums.rbegin(), nums.rend());
        std::vector<int> right = smallerCounts(reversed);
        std::reverse(right.begin(), right.end());
        int big = 0;
        for (int i = 0; i < (int)nums.size(); ++i)
            if (left[i] >= k && right[i] >= k)
                ++big;
        return big;
    }
};
