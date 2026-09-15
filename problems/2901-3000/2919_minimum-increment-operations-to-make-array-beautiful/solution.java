class Solution {

    // Raising a position above k never helps, so each position i has a
    // fixed cost max(0, k - nums[i]) for being raised; nums is beautiful
    // exactly when every window of 3 consecutive positions contains a
    // raised one. dp[i] = cheapest plan covering every window in the
    // prefix ending at i with position i raised, and the previous raised
    // position must be within distance 3. The total reaches
    // 10^5 * 10^9 = 10^14, past int range, so the costs stay in long.
    public long minIncrementOperations(int[] nums, int k) {
        long a = Math.max(0, k - nums[0]);
        long b = Math.max(0, k - nums[1]);
        long c = Math.max(0, k - nums[2]);
        for (int i = 3; i < nums.length; i++) {
            // Only the last three states are ever read: roll the window.
            long next = Math.max(0, k - nums[i]) + Math.min(a, Math.min(b, c));
            a = b;
            b = c;
            c = next;
        }
        // The last raised position can be any of the final three.
        return Math.min(a, Math.min(b, c));
    }
}
