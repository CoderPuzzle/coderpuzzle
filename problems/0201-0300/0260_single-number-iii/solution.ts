function singleNumber(nums: number[]): number[] {
    // XOR of the whole array: every value appearing twice cancels to
    // zero, so total is the XOR of exactly the two singles.
    let total = 0;
    for (const value of nums) {
        total ^= value;
    }
    // total is nonzero (the singles are distinct); each set bit marks a
    // position where they differ. Isolate the lowest one: negation keeps
    // that bit and flips all lower bits, so the AND leaves exactly it.
    const mask = total & -total;
    // XOR only the values with that bit set. Duplicate pairs land in the
    // same group and cancel again; the singles differ at that bit, so
    // exactly one of them is here — leaving first as that single.
    let first = 0;
    for (const value of nums) {
        if ((value & mask) !== 0) {
            first ^= value;
        }
    }
    // total was the XOR of both singles, so the other falls out for free.
    const second = total ^ first;
    // Ordering only normalizes the output.
    return [Math.min(first, second), Math.max(first, second)];
}
