function findMaximumXOR(nums: number[]): number {
    let best = 0;
    let mask = 0;
    // Decide each answer bit from the MSB down: a set higher bit dominates
    // all lower bits, so keep it whenever some pair achieves it.
    for (let bit = 30; bit >= 0; bit--) {
        mask |= 1 << bit;
        // Prefixes = numbers truncated to the bits considered so far.
        const prefixes = new Set<number>();
        for (const value of nums) {
            prefixes.add(value & mask);
        }
        const candidate = best | (1 << bit);
        // Achievable iff two prefixes XOR to candidate, i.e.
        // candidate ^ prefix is itself a prefix.
        let found = false;
        for (const prefix of prefixes) {
            if (prefixes.has(candidate ^ prefix)) {
                found = true;
                break;
            }
        }
        if (found) {
            best = candidate;
        }
    }
    return best;
}
