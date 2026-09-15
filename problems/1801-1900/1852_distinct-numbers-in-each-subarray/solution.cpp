#include <unordered_map>
#include <vector>

class Solution {
  public:
    // One frequency map slides with the window; the running count of values
    // whose frequency is nonzero is the answer per window.
    std::vector<int> distinctNumbers(std::vector<int> &nums, int k) {
        int n = nums.size();
        std::vector<int> ans(n - k + 1);
        std::unordered_map<int, int> freq;
        freq.reserve(n * 2);
        int distinct = 0;
        for (int i = 0; i < n; i++) {
            distinct += freq[nums[i]]++ == 0;
            if (i >= k && --freq[nums[i - k]] == 0) {
                distinct--;
            }
            if (i >= k - 1) {
                ans[i - k + 1] = distinct;
            }
        }
        return ans;
    }
};
