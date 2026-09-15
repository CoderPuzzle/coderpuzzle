function findMaxConsecutiveOnes(nums: number[]): number {
    // One pass with a running count: a 1 extends the current run of
    // ones, a 0 ends it and resets the count to zero.
    let count = 0;
    let best = 0;
    for (const value of nums) {
        if (value === 1) {
            ++count;
            // A run only reaches its full length at its last 1, so
            // tracking the best while it grows misses nothing.
            best = Math.max(best, count);
        } else {
            count = 0;
        }
    }
    return best;
}
