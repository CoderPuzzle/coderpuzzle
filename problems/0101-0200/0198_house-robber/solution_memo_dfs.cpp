class Solution {
    // Top-down mirror of the rolling DP: best(i) = max loot from house i
    // onward. memo[i] caches it (-1 = not computed yet); n <= 100 keeps the
    // recursion depth trivially safe.
    int best(vector<int> &nums, vector<int> &memo, int i) {
        // Past the last house there is nothing left to take.
        if (i >= (int)nums.size())
            return 0;
        if (memo[i] < 0) {
            // Rob house i (so i+1 is off limits) or skip it.
            memo[i] = max(nums[i] + best(nums, memo, i + 2), best(nums, memo, i + 1));
        }
        return memo[i];
    }

  public:
    int rob(vector<int> &nums) {
        vector<int> memo(nums.size(), -1);
        return best(nums, memo, 0);
    }
};
