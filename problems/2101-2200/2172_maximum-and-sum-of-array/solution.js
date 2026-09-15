/**
 * @param {number[]} nums
 * @param {number} numSlots
 * @return {number}
 */
var maximumANDSum = function (nums, numSlots) {
    // Model each slot as two individual positions: position p belongs to
    // slot p/2 + 1. numSlots <= 9 gives at most 18 positions, so 2^18
    // states exhaustively cover every assignment.
    const positions = 2 * numSlots;
    const size = 1 << positions;
    const dp = new Array(size).fill(-1);
    dp[0] = 0;
    let best = 0;
    for (let mask = 0; mask < size; mask++) {
        // -1 marks unreachable masks.
        if (dp[mask] < 0) {
            continue;
        }
        // popcount (the Kernighan loop) says how many numbers are placed, so
        // the next number is determined by the state — a fixed placement
        // order is exact because the sum is symmetric in the assignment.
        let i = 0;
        for (let x = mask; x; x &= x - 1) {
            i++;
        }
        if (i === nums.length) {
            best = Math.max(best, dp[mask]);
            continue;
        }
        for (let p = 0; p < positions; p++) {
            if (mask & (1 << p)) {
                continue;
            }
            const nxt = dp[mask] + (nums[i] & ((p >> 1) + 1));
            const slotMask = mask | (1 << p);
            if (nxt > dp[slotMask]) {
                dp[slotMask] = nxt;
            }
        }
    }
    return best;
};
