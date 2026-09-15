class Solution {
  public:
    // Pair sorted extremes: nums[i] with nums[n-1-i]. An exchange
    // argument shows this minimizes the largest pair sum.
    long long minPairSum(vector<int> &nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        long long best = 0;
        for (int i = 0; i + i < n; i++) {
            best = max(best, (long long)nums[i] + nums[n - 1 - i]);
        }
        return best;
    }
};
