function firstStableIndex(nums: number[], k: number): number {
    const suffixMin = nums.slice();
    for (let i = nums.length - 2; i >= 0; i--) {
        suffixMin[i] = Math.min(nums[i], suffixMin[i + 1]);
    }

    let prefixMax = nums[0];
    for (let i = 0; i < nums.length; i++) {
        prefixMax = Math.max(prefixMax, nums[i]);
        if (prefixMax - suffixMin[i] <= k) return i;
    }
    return -1;
}
