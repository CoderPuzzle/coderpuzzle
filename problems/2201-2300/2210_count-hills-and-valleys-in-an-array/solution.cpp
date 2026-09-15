class Solution {
  public:
    int countHillValley(vector<int> &nums) {
        // A whole run of equal neighbors shares one pair of closest
        // non-equal neighbors, so collapsing each maximal run of equal
        // values to a single representative turns "count hills and
        // valleys, once per run" into "count interior local extrema" of
        // the compressed sequence. The endpoints of the compressed
        // sequence are missing a non-equal neighbor on one side, which
        // the interior-only loop encodes exactly.
        vector<int> compressed;
        compressed.push_back(nums[0]);
        for (int i = 1; i < (int)nums.size(); ++i) {
            if (nums[i] != compressed.back()) {
                compressed.push_back(nums[i]);
            }
        }
        int count = 0;
        for (int i = 1; i < (int)compressed.size() - 1; ++i) {
            int left = compressed[i - 1], mid = compressed[i], right = compressed[i + 1];
            if ((mid > left && mid > right) || (mid < left && mid < right)) {
                ++count;
            }
        }
        return count;
    }
};
