class Solution {
  public:
    int threeSumClosest(vector<int> &nums, int target) {
        // Sorting is what buys the two-pointer scan: past any index values
        // only grow, so a sum that is too small safely retires its low end
        // and a sum that is too large retires its high end.
        sort(nums.begin(), nums.end());
        int closest = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < (int)nums.size() - 2; ++i) {
            int lo = i + 1, hi = (int)nums.size() - 1;
            while (lo < hi) {
                int total = nums[i] + nums[lo] + nums[hi];
                // Distance zero cannot be beaten, so an exact hit returns
                // on the spot.
                if (total == target)
                    return total;
                if (abs(total - target) < abs(closest - target))
                    closest = total;
                // Retire the end that pushed the sum to the wrong side:
                // sorted order makes every partner behind it further away.
                if (total < target)
                    ++lo;
                else
                    --hi;
            }
        }
        return closest;
    }
};
