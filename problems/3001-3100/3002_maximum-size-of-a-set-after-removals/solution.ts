function maximumSetSize(nums1: number[], nums2: number[]): number {
    const s1 = new Set<number>(nums1);
    const s2 = new Set<number>(nums2);

    // Count values unique to each side and the shared remainder.
    let only1 = 0;
    for (const v of s1) {
        if (!s2.has(v)) {
            only1++;
        }
    }
    let only2 = 0;
    for (const v of s2) {
        if (!s1.has(v)) {
            only2++;
        }
    }
    const common = s1.size - only1;

    // Each side spends its slots on unique values first; leftover slots add
    // at most one new element each, and only common values qualify, each
    // counting once no matter which side inserts it.
    const half = nums1.length / 2;
    const a = Math.min(half, only1);
    const b = Math.min(half, only2);
    return a + b + Math.min(common, nums1.length - a - b);
}
