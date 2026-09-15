function partitionDisjoint(nums: number[]): number {
    // Suffix minima: minFrom[i] is the minimum of nums[i:], built
    // right to left so each step reuses the suffix behind it.
    const n = nums.length;
    const minFrom: number[] = new Array(n);
    minFrom[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; --i) {
        minFrom[i] = Math.min(nums[i], minFrom[i + 1]);
    }
    // Prefix max sweep: the first cut whose left max clears the
    // right min is the smallest valid left.
    let maxTo = nums[0];
    for (let i = 1; i < n; ++i) {
        if (maxTo <= minFrom[i]) {
            return i;
        }
        maxTo = Math.max(maxTo, nums[i]);
    }
    // Unreachable on valid input: the guarantee says a cut exists.
    return n - 1;
}
