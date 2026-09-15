class Solution {
  public:
    double findMaxAverage(vector<int> &nums, int k) {
        // Every window has length k, so the best average is the best window
        // sum divided by k once at the end: keep the sum in an exact integer
        // and let the single division decide precision.
        long long window = 0;
        for (int index = 0; index < k; ++index) {
            window += nums[index];
        }
        long long best = window;
        for (int index = k; index < (int)nums.size(); ++index) {
            window += nums[index] - nums[index - k];
            if (window > best) {
                best = window;
            }
        }
        return (double)best / k;
    }
};
