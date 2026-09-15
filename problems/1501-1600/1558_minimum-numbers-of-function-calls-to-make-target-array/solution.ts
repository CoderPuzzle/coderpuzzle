function minOperations(nums: number[]): number {
    // Each element's popcount is the number of independent increments it
    // needs; the doublings are shared by the whole array, so only the
    // element with the most bits sets how many doublings are needed.
    let total = 0;
    let maxBits = 0;
    for (const v of nums) {
        total += popcount(v);
        const bits = v === 0 ? 0 : 32 - Math.clz32(v);
        maxBits = Math.max(maxBits, bits);
    }
    return total + Math.max(maxBits - 1, 0);
}

function popcount(x: number): number {
    let count = 0;
    while (x > 0) {
        count += x & 1;
        x >>>= 1;
    }
    return count;
}
