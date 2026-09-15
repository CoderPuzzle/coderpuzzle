class Solution {
  public:
    long long maximumTotalCost(vector<int> &nums) {
        // Splitting is only ever worth it to make a negative element flip
        // sign, and a subarray forces alternating signs from its head — so
        // per element there are two states: it keeps its phase-plus sign
        // (free to continue or restart after a worst-so-far prefix) or it
        // rides in as negated, which requires the previous element to have
        // kept its sign. The seeds are exactly hint dp[1][*]; two rolling
        // variables carry the table.
        if (nums.size() == 1) {
            return nums[0];
        }
        long long keep = (long long)nums[0] + nums[1];
        long long flip = (long long)nums[0] - nums[1];
        for (size_t i = 2; i < nums.size(); ++i) {
            long long nextKeep = max(keep, flip) + nums[i];
            flip = keep - nums[i];
            keep = nextKeep;
        }
        return max(keep, flip);
    }
};
