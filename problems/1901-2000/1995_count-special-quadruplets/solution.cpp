#include <unordered_map>
#include <vector>

class Solution {
  public:
    int countQuadruplets(vector<int> &nums) {
        // The condition rewrites to nums[a] + nums[b] == nums[d] - nums[c].
        // Sweep c left to right, and for each d > c count how many earlier
        // pairs (a, b) with b < c already sum to nums[d] - nums[c]; a map of
        // pair sums is extended by one entry per c step. Every valid
        // quadruplet is counted exactly once at its c, d pair. The maximum
        // answer is C(50, 4) = 230300, well inside int.
        int n = (int)nums.size();
        int ans = 0;
        unordered_map<int, int> twoSum;
        for (int c = 0; c < n; ++c) {
            for (int a = 0; a < c - 1; ++a) {
                int s = nums[a] + nums[c - 1];
                ++twoSum[s];
            }
            for (int d = c + 1; d < n; ++d) {
                auto it = twoSum.find(nums[d] - nums[c]);
                if (it != twoSum.end()) {
                    ans += it->second;
                }
            }
        }
        return ans;
    }
};
