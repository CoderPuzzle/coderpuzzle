function minImpossibleOR(nums: number[]): number {
    // The answer is always the first absent power of two, and both
    // directions are forced. Once 1, 2, 4, ..., 2^(k-1) are all
    // present, their disjoint-bit subsequences rebuild every positive
    // integer below 2^k exactly. Conversely an OR equals 2^k only if
    // some participating element carries bit k and no other bit —
    // which means 2^k itself sits in the array. So scan powers upward
    // until one is missing; values are at most 10^9 < 2^30, so 2^30
    // itself can never be present and the scan stops there at the
    // latest.
    const present = new Set<number>(nums);
    let power = 1;
    while (present.has(power)) {
        power *= 2;
    }
    return power;
}
