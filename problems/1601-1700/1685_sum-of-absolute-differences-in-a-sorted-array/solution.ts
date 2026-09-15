function getSumAbsoluteDifferences(nums: number[]): number[] {
    const n = nums.length;
    let total = 0;
    for (const x of nums) total += x;
    let prefix = 0;
    const result: number[] = [];
    for (let i = 0; i < n; i++) {
        const x = nums[i];
        // Sorted order dissolves the absolute values: every element left
        // of i is <= x and every element right of i is >= x, so each side
        // collapses into one signed sum.
        // Left part: x*i - prefix, the sum of the first i elements.
        const left = x * i - prefix;
        const suffix = total - prefix - x;
        // Right part: suffix sum - x*(n - i - 1).
        const right = suffix - x * (n - i - 1);
        // Ties are exact — equal values contribute 0 on either side.
        result.push(left + right);
        prefix += x;
    }
    return result;
}
