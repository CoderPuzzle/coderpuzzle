class Solution {
  public:
    int largestSumAfterKNegations(vector<int> &nums, int k) {
        // Sort so the most negative values lead, then spend operations on
        // them first — flipping the most negative value always raises the
        // sum by the most. Stop as soon as either k runs out or the walk
        // reaches a nonnegative value.
        sort(nums.begin(), nums.end());
        int n = static_cast<int>(nums.size());
        int i = 0;
        while (i < n && nums[i] < 0 && k > 0) {
            nums[i] = -nums[i];
            --k;
            ++i;
        }
        int total = 0;
        int minAbs = INT_MAX;
        for (int value : nums) {
            total += value;
            minAbs = min(minAbs, abs(value));
        }
        // Any leftover operations only matter by parity: flipping the same
        // value twice restores it. An odd leftover must land somewhere, and
        // the cheapest place is the smallest absolute value in the array —
        // scanning the whole array (not just the untouched suffix) also
        // covers a zero sitting among the values, which absorbs the flip
        // for free no matter how many operations remain.
        if (k % 2 == 1) {
            total -= 2 * minAbs;
        }
        return total;
    }
};
