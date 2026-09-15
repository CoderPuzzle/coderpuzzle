class Solution {
  public:
    int findTargetSumWays(vector<int> &nums, int target) {
        // dp maps each reachable running sum to the number of sign
        // assignments producing it; one way to stand at 0 before any number.
        unordered_map<int, long long> dp;
        dp[0] = 1;
        for (int value : nums) {
            // Each reachable total branches into +value and -value;
            // identical totals merge and their counts add, so the map stays
            // bounded by distinct sums, not 2^i.
            unordered_map<int, long long> nxt;
            for (auto &[total, count] : dp) {
                nxt[total + value] += count;
                nxt[total - value] += count;
            }
            dp = move(nxt);
        }
        return (int)dp.count(target) ? (int)dp[target] : 0;
    }
};
