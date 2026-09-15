class Solution {
  public:
    int findValueOfPartition(vector<int> &nums) {
        // A partition's value is the distance between one cross-side pair: the
        // largest element of nums1 against the smallest of nums2. No partition
        // can beat the closest two values in the whole array, and a split
        // around that closest sorted pair realizes it exactly.
        sort(nums.begin(), nums.end());
        int best = INT_MAX;
        for (int i = 1; i < (int)nums.size(); ++i) {
            // Values are at most 10^9 apart, so every gap fits an int as is.
            best = min(best, nums[i] - nums[i - 1]);
        }
        return best;
    }
};
