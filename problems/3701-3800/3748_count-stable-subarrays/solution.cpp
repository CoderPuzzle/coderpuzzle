class Solution {
  public:
    vector<long long> countStableSubarrays(vector<int> &nums, vector<vector<int>> &queries) {
        int n = nums.size();
        // left[i] is the smallest start s such that nums[s..i] reads
        // non-decreasing; it only ever moves right, which the per-query
        // binary search below relies on.
        vector<int> left(n);
        vector<long long> prefLeft(n + 1, 0), prefBase(n + 1, 0);
        for (int i = 0; i < n; i++) {
            left[i] = (i > 0 && nums[i] >= nums[i - 1]) ? left[i - 1] : i;
            // Stable subarrays ending at i inside their own run.
            prefLeft[i + 1] = prefLeft[i] + left[i];
            prefBase[i + 1] = prefBase[i] + (i - left[i] + 1);
        }
        vector<long long> result;
        result.reserve(queries.size());
        for (const auto &query : queries) {
            int l = query[0], r = query[1];
            // First end whose run reaches back to l or earlier. Ends before
            // it sit past a drop at or after l and count their bare window
            // length; ends from there on count down to left[e].
            int p = lower_bound(left.begin() + l, left.begin() + r + 1, l) - left.begin();
            result.push_back(prefBase[r + 1] - prefBase[l] + prefLeft[p] - prefLeft[l] - (long long)l * (p - l));
        }
        return result;
    }
};
