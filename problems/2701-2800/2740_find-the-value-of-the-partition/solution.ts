function findValueOfPartition(nums: number[]): number {
    // A partition's value is the distance between one cross-side pair: the
    // largest element of nums1 against the smallest of nums2. No partition
    // can beat the closest two values in the whole array, and a split
    // around that closest sorted pair realizes it exactly.
    const sorted = [...nums].sort((a, b) => a - b);
    let best = Infinity;
    for (let i = 1; i < sorted.length; ++i) {
        // Numeric comparator above, not the default lexicographic sort.
        best = Math.min(best, sorted[i] - sorted[i - 1]);
    }
    return best;
}
