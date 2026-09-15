class Solution {
  public:
    long long rob(vector<int> &nums) {
        // A lone house has no distinct neighbor on either side, so robbing it
        // is legal even though both "give up an end" sweeps below see nothing.
        if (nums.size() == 1) {
            return nums[0];
        }
        // The circle's only extra edge over the line joins the first and last
        // houses, so every legal plan gives up the first house or the last:
        // solve the linear street on nums[1:] and nums[:-1], keep the better.
        return max(robLine(nums, 1, nums.size()), robLine(nums, 0, nums.size() - 1));
    }

  private:
    // Rolling two-variable DP over houses[start, stop): cur is the best through
    // house i-1, prev the best through i-2, so no DP table is ever allocated.
    long long robLine(vector<int> &nums, size_t start, size_t stop) {
        long long prev = 0;
        long long cur = 0;
        for (size_t i = start; i < stop; ++i) {
            long long next = max(cur, prev + nums[i]);
            prev = cur;
            cur = next;
        }
        return cur;
    }
};
