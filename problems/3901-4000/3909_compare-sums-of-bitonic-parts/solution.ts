function compareBitonicSums(nums: number[]): number {
    let total = 0;
    let ascending = 0;
    let peak = nums[0];
    for (let index = 0; index < nums.length; ++index) {
        total += nums[index];
        if (index === 0 || nums[index] > nums[index - 1]) ascending += nums[index];
        peak = Math.max(peak, nums[index]);
    }
    const descending = total - ascending + peak;
    if (ascending > descending) return 0;
    if (descending > ascending) return 1;
    return -1;
}
