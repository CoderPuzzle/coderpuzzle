class Solution {
  public:
    double minimumAverage(vector<int> &nums) {
        // Every round pairs the current minimum with the current maximum;
        // after sorting, those are exactly nums[k] and nums[n-1-k]. Sums
        // stay <= 100 and the single division by 2 at double precision is
        // exact: every pair sum of integers in 1..50 equals an integer or
        // an integer plus one half.
        sort(nums.begin(), nums.end());
        int n = nums.size();
        double best = numeric_limits<double>::max();
        for (int k = 0; k < n / 2; ++k) {
            best = min(best, (nums[k] + nums[n - 1 - k]) / 2.0);
        }
        return best;
    }
};
