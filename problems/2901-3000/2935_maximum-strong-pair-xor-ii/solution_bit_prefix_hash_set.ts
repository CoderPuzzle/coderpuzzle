function maximumStrongPairXor(nums: number[]): number {
    // Sorted sweep with a sliding window [ceil(y/2), y]: one hash map
    // keyed on the values' bit prefixes (top bit down, each key carrying
    // a leading 1 bit that pins its length), each key counting how many
    // live window values pass through it, answers "best XOR partner of y
    // in the window" greedily. The left pointer retires values whose
    // doubling falls below y.
    nums.sort((a, b) => a - b);
    const BITS = 20; // nums[i] <= 2^20 - 1
    const prefixes = new Map<number, number>();
    let best = 0;
    let left = 0;
    for (const y of nums) {
        // insert y: one key per prefix length, top bit down
        for (let b = BITS - 1; b >= 0; --b) {
            const key = (1 << (BITS - b)) | (y >> b);
            prefixes.set(key, (prefixes.get(key) ?? 0) + 1);
        }
        // retire x from the left while 2 * nums[left] < y
        while (2 * nums[left] < y) {
            const x = nums[left];
            for (let b = BITS - 1; b >= 0; --b) {
                const key = (1 << (BITS - b)) | (x >> b);
                const remaining = (prefixes.get(key) ?? 0) - 1;
                if (remaining > 0) {
                    prefixes.set(key, remaining);
                } else {
                    prefixes.delete(key);
                }
            }
            ++left;
        }
        // query: prefer flipping y's bit while that prefix is live
        let p = 1; // the leading 1 bit, then no value bits yet
        let res = 0;
        for (let b = BITS - 1; b >= 0; --b) {
            const d = (y >> b) & 1;
            const want = (p << 1) | (d ^ 1);
            if (prefixes.has(want)) {
                res |= 1 << b;
                p = want;
            } else {
                p = (p << 1) | d;
            }
        }
        best = Math.max(best, res);
    }
    return best;
}
