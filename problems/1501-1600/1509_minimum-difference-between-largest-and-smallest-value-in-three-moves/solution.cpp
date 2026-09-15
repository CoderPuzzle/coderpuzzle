class Solution {
  public:
    int minDifference(vector<int> &nums) {
        int n = (int)nums.size();
        // Four or fewer elements can all be pulled to one value in at most
        // three moves.
        if (n <= 4) {
            return 0;
        }
        sort(nums.begin(), nums.end());
        // Try each of the four ways to split three removals between the low
        // end and the high end of the sorted array.
        int best = INT_MAX;
        for (int i = 0; i < 4; ++i) {
            best = min(best, nums[n - 4 + i] - nums[i]);
        }
        return best;
    }
};
