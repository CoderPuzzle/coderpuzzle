class Solution {
  public:
    vector<vector<int>> fourSum(vector<int> &nums, int target) {
        // Sort in place: every emitted quadruplet is ascending, and the
        // i-then-j scan emits the quadruplets in lexicographic order.
        sort(nums.begin(), nums.end());
        int n = (int)nums.size();
        vector<vector<int>> result;
        for (int i = 0; i + 3 < n; i++) {
            // Reusing the same value for the first slot would re-find the same
            // triples, so skip runs of equal values.
            if (i > 0 && nums[i] == nums[i - 1])
                continue;
            for (int j = i + 1; j + 2 < n; j++) {
                // Same skip one level down, measured against j's own start.
                if (j > i + 1 && nums[j] == nums[j - 1])
                    continue;
                int left = j + 1, right = n - 1;
                while (left < right) {
                    // Four values of up to 1e9 in magnitude overflow int, so
                    // the running total lives in a long long.
                    long long total = (long long)nums[i] + nums[j] + nums[left] + nums[right];
                    // Below target the sum must grow, so left moves right;
                    // above target, right retreats.
                    if (total < target) {
                        left++;
                    } else if (total > target) {
                        right--;
                    } else {
                        result.push_back({nums[i], nums[j], nums[left], nums[right]});
                        // Both advance, then run past any runs of equal values,
                        // so the same pair is never emitted twice for one (i, j).
                        left++;
                        right--;
                        while (left < right && nums[left] == nums[left - 1])
                            left++;
                        while (left < right && nums[right] == nums[right + 1])
                            right--;
                    }
                }
            }
        }
        return result;
    }
};
