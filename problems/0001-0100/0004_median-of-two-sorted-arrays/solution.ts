function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Keep nums1 as the shorter array: smaller search space, and the
    // partner cut j is guaranteed to land inside [0, n].
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    const m = nums1.length,
        n = nums2.length;
    const total = m + n;
    const half = Math.floor(total / 2);
    let lo = 0,
        hi = m;
    while (true) {
        // Binary-search the cut: i = elements nums1 gives to the left
        // half; the cut in nums2 is then forced by the half's size.
        const i = Math.floor((lo + hi) / 2);
        const j = half - i;
        // Sentinels make edge cuts well-defined: a cut at 0 or past the
        // end needs no special casing.
        const aLeft = i > 0 ? nums1[i - 1] : -Infinity;
        const aRight = i < m ? nums1[i] : Infinity;
        const bLeft = j > 0 ? nums2[j - 1] : -Infinity;
        const bRight = j < n ? nums2[j] : Infinity;
        // Both arrays are sorted, so comparing across the cut suffices:
        // everything on the left is <= everything on the right.
        if (aLeft <= bRight && bLeft <= aRight) {
            if (total % 2 === 1) {
                // Odd total: the left half was made the smaller side.
                return Math.min(aRight, bRight);
            }
            return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
        }
        if (aLeft > bRight) {
            // nums1 is contributing too many elements to the left half.
            hi = i - 1;
        } else {
            lo = i + 1;
        }
    }
}
