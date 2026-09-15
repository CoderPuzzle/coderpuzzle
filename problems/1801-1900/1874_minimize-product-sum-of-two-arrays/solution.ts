function minProductSum(nums1: number[], nums2: number[]): number {
    // Rearrangement inequality: ascending x descending pairing minimizes
    // the sum of products over all rearrangements of nums1. Terms are at
    // most 1e4 and n <= 1e5, so the total stays exact as a JS number.
    const a = [...nums1].sort((x, y) => x - y);
    const b = [...nums2].sort((x, y) => y - x);
    let total = 0;
    for (let i = 0; i < a.length; i++) {
        total += a[i] * b[i];
    }
    return total;
}
