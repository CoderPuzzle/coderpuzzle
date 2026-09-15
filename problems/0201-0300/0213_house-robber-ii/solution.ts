function rob(nums: number[]): number {
    // A lone house has no distinct neighbor on either side, so robbing it
    // is legal even though both "give up an end" sweeps below see nothing.
    if (nums.length === 1) {
        return nums[0];
    }
    // The circle's only extra edge over the line joins the first and last
    // houses, so every legal plan gives up the first house or the last:
    // solve the linear street on nums[1:] and nums[:-1], keep the better.
    return Math.max(robLine(nums.slice(1)), robLine(nums.slice(0, -1)));
}

// Rolling two-variable DP: cur is the best through house i-1, prev the best
// through i-2, so no DP table is ever allocated.
function robLine(houses: number[]): number {
    let prev = 0;
    let cur = 0;
    for (const money of houses) {
        const next = Math.max(cur, prev + money);
        prev = cur;
        cur = next;
    }
    return cur;
}
