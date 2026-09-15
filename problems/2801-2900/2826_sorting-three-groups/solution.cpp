class Solution {
  public:
    int minimumOperations(vector<int> &nums) {
        // Removing the minimum number of elements is keeping the maximum
        // non-decreasing subsequence, and with values confined to {1, 2, 3}
        // such a subsequence is a run of 1s, then 2s, then 3s. One pass
        // keeps three running best lengths ending in each value: appending
        // x may extend any subsequence ending in a value <= x, so each
        // update is one plus the largest eligible counter. n <= 100 keeps
        // every count far inside int range.
        int keep1 = 0;
        int keep2 = 0;
        int keep3 = 0;
        for (int x : nums) {
            if (x == 1) {
                ++keep1;
            } else if (x == 2) {
                keep2 = max(keep2, keep1) + 1;
            } else {
                keep3 = max(max(keep1, keep2), keep3) + 1;
            }
        }
        return static_cast<int>(nums.size()) - max(max(keep1, keep2), keep3);
    }
};
