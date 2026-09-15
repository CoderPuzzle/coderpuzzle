function findMissingElements(nums: number[]): number[] {
    // Mark presence per value, then sweep the original range [min, max] in
    // increasing order: every unmarked value is missing, and sweeping in
    // order yields the sorted result directly.
    const lo = Math.min(...nums);
    const hi = Math.max(...nums);
    const present: boolean[] = new Array(hi + 1).fill(false);
    for (const value of nums) {
        present[value] = true;
    }
    const missing: number[] = [];
    for (let value = lo; value <= hi; ++value) {
        if (!present[value]) {
            missing.push(value);
        }
    }
    return missing;
}
