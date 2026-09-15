function singleNumber(nums: number[]): number {
    // Two accumulators implement a mod-3 counter on every bit at once: a
    // bit is "in ones" after being seen 1 (mod 3) times and "in twos" after
    // 2 (mod 3); triples cycle a bit 00 -> ones -> twos -> 00.
    let ones = 0,
        twos = 0;
    for (const value of nums) {
        // XOR toggles the bit's state, and the & ~mask guard keeps a bit
        // already in the other register from entering this one.
        ones = (ones ^ value) & ~twos;
        twos = (twos ^ value) & ~ones;
    }
    // The unique value's bits were seen once, so they rest in ones.
    return ones;
}
