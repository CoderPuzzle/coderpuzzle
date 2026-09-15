function distinctDifferenceArray(nums: number[]): number[] {
    // One right-to-left pass records how many distinct values survive
    // after each index, then a left-to-right pass grows the prefix set,
    // so every diff is a single subtraction of two maintained counts.
    const n = nums.length;
    const suffixDistinct: number[] = new Array(n).fill(0);
    const seen = new Set<number>();
    for (let i = n - 1; i >= 0; --i) {
        // Visited values are exactly those right of i, so this records the
        // distinct count of nums[i + 1, ..., n - 1] itself.
        suffixDistinct[i] = seen.size;
        seen.add(nums[i]);
    }
    const prefixSeen = new Set<number>();
    const result: number[] = [];
    for (let i = 0; i < n; ++i) {
        prefixSeen.add(nums[i]);
        result.push(prefixSeen.size - suffixDistinct[i]);
    }
    return result;
}
