function minimumOperations(nums: number[]): number {
    // Suffixes of a distinct array stay distinct, so the surviving tail is
    // nums[j:] for the smallest j whose suffix is duplicate-free. Scanning
    // right-to-left, that j is one past the first value that repeats inside
    // the tail; each operation removes 3 front elements.
    const seen = new Set<number>();
    let j = 0;
    for (let i = nums.length - 1; i >= 0; --i) {
        if (seen.has(nums[i])) {
            j = i + 1;
            break;
        }
        seen.add(nums[i]);
    }
    return Math.ceil(j / 3);
}
