function numberOfSubarrays(nums: number[], k: number): number {
    // "Exactly k odds" resists a direct window: one odd arrival can
    // break the contract with no symmetric way back. "At most cap odds"
    // repairs any breach from the left, and exactly k is the subtraction
    // of one such budget from a slightly larger one.
    const atMost = function (cap: number): number {
        // Counts subarrays holding at most cap odds: with [left, right]
        // inside the budget and left the smallest such start, every
        // opening from left onward qualifies, so right - left + 1
        // subarrays ending here join the total.
        // Never taken under the statement's k >= 1; it lets the helper
        // answer on its own terms.
        if (cap < 0) {
            return 0;
        }
        let left = 0;
        let odds = 0;
        let total = 0;
        for (let right = 0; right < nums.length; ++right) {
            odds += nums[right] & 1;
            // An odd broke the budget: retire odds from the left until
            // it holds again. Both ends only ever advance, so the sweep
            // stays linear.
            while (odds > cap) {
                odds -= nums[left] & 1;
                left++;
            }
            total += right - left + 1;
        }
        return total;
    };
    return atMost(k) - atMost(k - 1);
}
