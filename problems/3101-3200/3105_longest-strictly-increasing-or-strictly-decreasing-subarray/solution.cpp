class Solution {
  public:
    int longestMonotonicSubarray(vector<int> &nums) {
        int best = 1;
        int inc = 1;
        int dec = 1;
        for (int index = 1; index < static_cast<int>(nums.size()); index++) {
            if (nums[index] > nums[index - 1]) {
                inc++;
                dec = 1;
            } else if (nums[index] < nums[index - 1]) {
                dec++;
                inc = 1;
            } else {
                inc = 1;
                dec = 1;
            }
            best = max({best, inc, dec});
        }
        return best;
    }
};
