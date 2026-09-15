class Solution {
  public:
    int maxProduct(vector<int> &nums) {
        // Seed with the first element so a single-element array returns itself.
        int best = nums[0];
        // Extremes of subarray products ending exactly at the current index;
        // the minimum must be carried too because a negative factor reverses
        // the order and can turn the worst product into the next best.
        int curMax = nums[0];
        int curMin = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            int value = nums[i];
            // A negative incoming value swaps the extremes so the usual
            // candidate rules apply unchanged.
            if (value < 0) {
                swap(curMax, curMin);
            }
            // Either start a fresh subarray at this value or extend.
            curMax = max(value, curMax * value);
            curMin = min(value, curMin * value);
            best = max(best, curMax);
        }
        return best;
    }
};
