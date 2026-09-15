function smallestAbsent(nums: number[]): number {
    // A hash set turns "is candidate c present in nums?" into an O(1)
    // lookup, so the answer is found by walking upward from 1.
    const present = new Set<number>(nums);
    // |total| <= 100 * 100 and every product below stays under 2^53, so
    // the arithmetic here is exact integer math -- no float rounding.
    let total = 0;
    for (const value of nums) {
        total += value;
    }
    const n = nums.length;
    // Skip candidates at or below the average: candidate > total/n is
    // tested as candidate * n > total, an exact integer comparison --
    // equality fails it, so an integral average excludes itself. The walk
    // starts at 1 because the answer must be positive.
    let candidate = 1;
    while (candidate * n <= total) {
        candidate++;
    }
    while (present.has(candidate)) {
        candidate++;
    }
    return candidate;
}
