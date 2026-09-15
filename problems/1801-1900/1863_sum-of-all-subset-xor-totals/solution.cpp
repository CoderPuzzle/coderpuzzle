#include <vector>

class Solution {
  public:
    // Every bit set in any element appears in exactly half of the 2^n
    // subsets, so the answer is (OR of all elements) * 2^(n-1).
    int subsetXORSum(std::vector<int> &nums) {
        int or_all = 0;
        for (int v : nums) {
            or_all |= v;
        }
        return or_all << (nums.size() - 1);
    }
};
