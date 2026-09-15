class Solution {
  public:
    int longestAlternatingSubarray(vector<int> &nums, int threshold) {
        int best = 0;
        int i = 0;
        while (i < (int)nums.size()) {
            // A window can only open here if nums[i] is even and within the
            // threshold; an odd or over-threshold element never starts a run.
            if (nums[i] % 2 != 0 || nums[i] > threshold) {
                ++i;
                continue;
            }
            // Stretch the right edge while parities alternate and every
            // element stays within the threshold.
            int j = i + 1;
            while (j < (int)nums.size() && nums[j] % 2 != nums[j - 1] % 2 && nums[j] <= threshold) {
                ++j;
            }
            best = max(best, j - i);
            // Sub-windows inside [i, j) are all shorter than this one, so
            // resume at the breaker: if it can start a window, it will.
            i = j;
        }
        return best;
    }
};
