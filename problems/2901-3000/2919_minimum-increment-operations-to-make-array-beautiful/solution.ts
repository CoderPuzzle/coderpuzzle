// Raising a position above k never helps, so each position i has a fixed
// cost max(0, k - nums[i]) for being raised; nums is beautiful exactly
// when every window of 3 consecutive positions contains a raised one.
// dp[i] = cheapest plan covering every window in the prefix ending at i
// with position i raised, and the previous raised position must be within
// distance 3. The total reaches 10^5 * 10^9 = 10^14 < 2^53, and no
// bitwise operator is involved, so doubles are exact.
function minIncrementOperations(nums: number[], k: number): number {
    let a = Math.max(0, k - nums[0]);
    let b = Math.max(0, k - nums[1]);
    let c = Math.max(0, k - nums[2]);
    for (let i = 3; i < nums.length; ++i) {
        // Only the last three states are ever read: roll the window.
        const next = Math.max(0, k - nums[i]) + Math.min(a, b, c);
        a = b;
        b = c;
        c = next;
    }
    // The last raised position can be any of the final three.
    return Math.min(a, b, c);
}
