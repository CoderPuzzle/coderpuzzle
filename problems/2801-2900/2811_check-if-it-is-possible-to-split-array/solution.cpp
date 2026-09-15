class Solution {
  public:
    bool canSplitArray(vector<int> &nums, int m) {
        // Lengths 1 and 2 reach singletons unconditionally. Beyond that,
        // some adjacent pair must sum to at least m: the last cut of any
        // finishing run frees a final two-element piece that was produced
        // good, while any qualifying pair stays glued as lone elements peel
        // off the ends.
        if ((int)nums.size() <= 2) {
            return true;
        }
        for (int i = 1; i < (int)nums.size(); ++i) {
            if (nums[i - 1] + nums[i] >= m) {
                return true;
            }
        }
        return false;
    }
};
