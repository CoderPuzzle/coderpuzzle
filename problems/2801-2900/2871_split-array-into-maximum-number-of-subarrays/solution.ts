function maxSubarrays(nums: number[]): number {
    let completed = 0;
    let current = -1;
    for (const num of nums) {
        current &= num;
        if (current === 0) {
            completed += 1;
            current = -1;
        }
    }
    return Math.max(completed, 1);
}
