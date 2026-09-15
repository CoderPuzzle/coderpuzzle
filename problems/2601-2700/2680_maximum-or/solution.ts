// All k doublings belong on one element: the OR's top bit comes from a
// single element, and giving that element every operation only pushes its
// bits higher, so split plans are never better. TypeScript's bitwise
// operators truncate to 32 bits, but every raw element is <= 10^9 < 2^30,
// so the | operators stay exact; the boosted element (10^9 * 2^15 < 2^45,
// still an exact double) is folded in arithmetically by splitting at
// bit 30.
function maximumOr(nums: number[], k: number): number {
    const suffix: number[] = new Array(nums.length + 1).fill(0);
    for (let i = nums.length - 1; i >= 0; --i) suffix[i] = suffix[i + 1] | nums[i];
    let best = 0;
    let prefix = 0;
    for (let i = 0; i < nums.length; ++i) {
        // OR of everything except nums[i]; every term is < 2^30, so this
        // bitwise OR is exact.
        const rest = prefix | suffix[i + 1];
        // nums[i] * 2^k can pass 2^31, past the bitwise operators' range:
        // split it at bit 30 so only sub-2^30 halves meet the | operator.
        const boosted = nums[i] * 2 ** k;
        const candidate = Math.floor(boosted / 2 ** 30) * 2 ** 30 + ((boosted % 2 ** 30) | rest);
        if (candidate > best) best = candidate;
        prefix |= nums[i];
    }
    return best;
}
