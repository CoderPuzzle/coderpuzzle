function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
    // Meet in the middle: a+b+c+d = 0 iff a+b = -(c+d), so index the first
    // two arrays' pair sums with multiplicities (not a set).
    const sums = new Map<number, number>();
    for (const a of nums1) {
        for (const b of nums2) {
            const key = a + b;
            sums.set(key, (sums.get(key) || 0) + 1);
        }
    }
    let total = 0;
    // Each (c,d) pair adds the number of (a,b) pairs summing to its
    // negation; every zero tuple is counted once via its unique split.
    for (const c of nums3) {
        for (const d of nums4) {
            total += sums.get(-(c + d)) || 0;
        }
    }
    return total;
}
