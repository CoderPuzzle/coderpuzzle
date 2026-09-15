class Solution {
  public:
    // Raising a position above k never helps, so each position i has a
    // fixed cost max(0, k - nums[i]) for being raised; nums is beautiful
    // exactly when every window of 3 consecutive positions contains a
    // raised one. dp[i] = cheapest plan covering every window in the
    // prefix ending at i with position i raised, and the previous raised
    // position must be within distance 3. The total reaches
    // 10^5 * 10^9 = 10^14, past 32-bit range, so the costs stay in
    // long long.
    long long minIncrementOperations(vector<int> &nums, int k) {
        long long a = max(0, k - nums[0]);
        long long b = max(0, k - nums[1]);
        long long c = max(0, k - nums[2]);
        for (int i = 3; i < (int)nums.size(); ++i) {
            // Only the last three states are ever read: roll the window.
            long long next = max(0, k - nums[i]) + min(a, min(b, c));
            a = b;
            b = c;
            c = next;
        }
        // The last raised position can be any of the final three.
        return min(a, min(b, c));
    }
};
