function minOperations(nums: number[]): number {
    // Prefix index 0 can only be fixed by a flip at i = 0, and after
    // fixing it nothing may flip it again — so a left-to-right sweep is
    // forced. flips parity tells whether the suffix has been inverted an
    // odd number of times so far; each effective 0 forces one more flip,
    // which also re-inverts every later position at once.
    let ops = 0;
    let flips = 0;
    for (const bit of nums) {
        if ((bit ^ (flips & 1)) === 0) {
            ops++;
            flips++;
        }
    }
    return ops;
}
