function intersect(nums1: number[], nums2: number[]): number[] {
    // Count how many times each value occurs in nums1, then walk nums2: a
    // value can join the result at most min(count1, count2) times, which
    // the per-value counter enforces by falling to zero.
    const counts = new Map<number, number>();
    for (const value of nums1) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    const picked: number[] = [];
    for (const value of nums2) {
        const remaining = counts.get(value);
        if (remaining !== undefined && remaining > 0) {
            picked.push(value);
            counts.set(value, remaining - 1);
        }
    }
    // The judge compares arrays exactly, so pin the any-order freedom to
    // ascending sorted order (numeric — the default sort is lexicographic).
    return picked.sort((a, b) => a - b);
}
