function firstStableIndex(nums: number[], k: number): number {
    for (let i = 0; i < nums.length; i++) {
        let prefixMax = nums[0];
        for (let j = 1; j <= i; j++) prefixMax = Math.max(prefixMax, nums[j]);

        let suffixMin = nums[i];
        for (let j = i + 1; j < nums.length; j++) suffixMin = Math.min(suffixMin, nums[j]);

        if (prefixMax - suffixMin <= k) return i;
    }
    return -1;
}
