class Solution {
  public:
    int maximumANDSum(vector<int> &nums, int numSlots) {
        // Model each slot as two individual positions: position p belongs to
        // slot p/2 + 1. numSlots <= 9 gives at most 18 positions, so 2^18
        // states exhaustively cover every assignment.
        int positions = 2 * numSlots;
        int size = 1 << positions;
        vector<int> dp(size, -1);
        dp[0] = 0;
        int best = 0;
        for (int mask = 0; mask < size; mask++) {
            // -1 marks unreachable masks.
            if (dp[mask] < 0) {
                continue;
            }
            // popcount says how many numbers are placed, so the next number
            // is determined by the state — a fixed placement order is exact
            // because the sum is symmetric in the assignment.
            int i = __builtin_popcount(mask);
            if (i == (int)nums.size()) {
                best = max(best, dp[mask]);
                continue;
            }
            for (int p = 0; p < positions; p++) {
                if (mask & (1 << p)) {
                    continue;
                }
                int nxt = dp[mask] + (nums[i] & (p / 2 + 1));
                int slotMask = mask | (1 << p);
                if (nxt > dp[slotMask]) {
                    dp[slotMask] = nxt;
                }
            }
        }
        return best;
    }
};
