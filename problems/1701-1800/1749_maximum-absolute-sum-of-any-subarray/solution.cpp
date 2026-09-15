class Solution {
  public:
    int maxAbsoluteSum(vector<int> &nums) {
        // The max of |subarray sum| is realized at one of the two
        // extremes: the max subarray sum or the negated min subarray
        // sum. Track both running extremes in one sweep, each starting
        // fresh whenever extending the run would only hurt it.
        long long best = 0, worst = 0, curMax = 0, curMin = 0;
        for (int v : nums) {
            curMax = max(curMax + (long long)v, (long long)v);
            best = max(best, curMax);
            curMin = min(curMin + (long long)v, (long long)v);
            worst = min(worst, curMin);
        }
        return (int)max(best, -worst);
    }
};
