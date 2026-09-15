function maxFrequency(nums: number[], k: number): number {
    // Operations only raise values, so an optimal equal-value group is a
    // contiguous window in sorted order, raised to its right end.
    const arr = [...nums].sort((a, b) => a - b);
    let best = 1;
    let left = 0;
    let windowSum = 0;
    for (let right = 0; right < arr.length; right++) {
        const value = arr[right];
        windowSum += value;
        // Cost = width * target - window sum, the increments needed to
        // lift everything to the right end; drop the smallest member
        // while the budget is exceeded.
        while ((right - left + 1) * value - windowSum > k) {
            windowSum -= arr[left];
            left += 1;
        }
        // Once a length is affordable, every shorter window is too.
        best = Math.max(best, right - left + 1);
    }
    return best;
}
