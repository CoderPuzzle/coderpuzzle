function threeSumClosest(nums: number[], target: number): number {
    // Sorting is what buys the two-pointer scan: past any index values only
    // grow, so a sum that is too small safely retires its low end and a sum
    // that is too large retires its high end.
    nums.sort((a, b) => a - b);
    let closest = nums[0] + nums[1] + nums[2];
    for (let i = 0; i < nums.length - 2; ++i) {
        let lo = i + 1,
            hi = nums.length - 1;
        while (lo < hi) {
            const total = nums[i] + nums[lo] + nums[hi];
            // Distance zero cannot be beaten, so an exact hit returns on
            // the spot.
            if (total === target) {
                return total;
            }
            if (Math.abs(total - target) < Math.abs(closest - target)) {
                closest = total;
            }
            // Retire the end that pushed the sum to the wrong side: sorted
            // order makes every partner behind it further away.
            if (total < target) {
                ++lo;
            } else {
                --hi;
            }
        }
    }
    return closest;
}
