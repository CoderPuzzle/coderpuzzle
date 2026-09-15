function minNumber(nums1: number[], nums2: number[]): number {
    // A shared digit admits a one-digit number; the smallest shared digit
    // then beats anything with more digits.
    const inSecond = new Set<number>(nums2);
    let common = Infinity;
    for (const d of nums1) {
        if (inSecond.has(d) && d < common) common = d;
    }
    if (common !== Infinity) return common;
    // No overlap: the answer has two digits, and the tens digit is just
    // whichever array holds the globally smaller minimum.
    const a = Math.min(...nums1);
    const b = Math.min(...nums2);
    return Math.min(10 * a + b, 10 * b + a);
}
