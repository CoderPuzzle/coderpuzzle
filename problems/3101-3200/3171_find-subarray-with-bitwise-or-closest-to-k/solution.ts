function minimumDifference(nums: number[], k: number): number {
    // Seed from the first element so single-element subarrays are covered.
    let best = Math.abs(nums[0] - k);
    // Empty-subarray seed: 0 | v = v lets the first build produce {v}.
    let current: number[] = [0];
    // OR never clears bits, so the nested frontier holds at most ~31 values.
    for (const value of nums) {
        // New frontier: {value} plus every previous OR extended by value.
        const nxt: number[] = [value];
        for (const prev of current) {
            nxt.push(prev | value);
        }
        nxt.sort((a, b) => a - b);
        const uniq: number[] = [];
        for (const x of nxt) {
            if (uniq.length === 0 || uniq[uniq.length - 1] !== x) uniq.push(x);
        }
        current = uniq;
        for (const x of current) {
            const diff = Math.abs(x - k);
            if (diff < best) best = diff;
        }
    }
    return best;
}
