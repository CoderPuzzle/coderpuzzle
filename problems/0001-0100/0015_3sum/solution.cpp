class Solution {
  public:
    vector<vector<int>> threeSum(vector<int> &nums) {
        // Sort in place: every emitted triplet is ascending, and the i-scan
        // emits triplets in lexicographic order.
        sort(nums.begin(), nums.end());
        int n = (int)nums.size();
        vector<vector<int>> result;
        for (int i = 0; i + 2 < n; i++) {
            // Reusing the same value for the fixed element would re-find
            // the same pairs, so skip runs of equal values.
            if (i > 0 && nums[i] == nums[i - 1])
                continue;
            // Early exit: the smallest remaining value is already positive,
            // so no triplet from here on can sum to zero.
            if ((long long)nums[i] * 3 > 0)
                break;
            int left = i + 1, right = n - 1;
            while (left < right) {
                long long total = (long long)nums[i] + nums[left] + nums[right];
                // Below zero the sum must grow, so left moves right; above
                // zero, right retreats.
                if (total < 0) {
                    left++;
                } else if (total > 0) {
                    right--;
                } else {
                    result.push_back({nums[i], nums[left], nums[right]});
                    // Both advance, then run past any runs of equal values,
                    // so the same pair is never emitted twice for one i.
                    left++;
                    right--;
                    while (left < right && nums[left] == nums[left - 1])
                        left++;
                    while (left < right && nums[right] == nums[right + 1])
                        right--;
                }
            }
        }
        return result;
    }
};
