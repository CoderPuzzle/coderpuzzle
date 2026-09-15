function maxEqualFreq(nums: number[]): number {
    const count = new Map<number, number>(); // value -> occurrences
    const freq = new Map<number, number>(); // occurrence count -> how many values have it
    let best = 0;
    for (let n = 1; n <= nums.length; ++n) {
        const value = nums[n - 1];
        const before = count.get(value) ?? 0;
        if (before > 0) {
            const slot = (freq.get(before) ?? 0) - 1;
            if (slot === 0) freq.delete(before);
            else freq.set(before, slot);
        }
        count.set(value, before + 1);
        freq.set(before + 1, (freq.get(before + 1) ?? 0) + 1);

        // At most two frequency classes can ever be fixable.
        const keys = [...freq.keys()].sort((x, y) => x - y);
        if (keys.length === 1) {
            const f = keys[0];
            if (f === 1 || freq.get(f) === 1) best = n;
        } else if (keys.length === 2) {
            const [a, b] = keys;
            // One value one above a uniform class: drop one of its copies.
            if (b === a + 1 && freq.get(b) === 1) best = n;
            // One singleton over a uniform class: drop the singleton.
            else if (a === 1 && freq.get(a) === 1 && 1 + b * (freq.get(b) ?? 0) === n) best = n;
        }
    }
    return best;
}
