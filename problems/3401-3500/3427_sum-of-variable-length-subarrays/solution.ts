function subarraySum(nums: number[]): number {
    // Window i covers nums[max(0, i - nums[i]) .. i] inclusive, so a
    // running prefix sum answers each window in O(1) as
    // prefix[i + 1] - prefix[start]. n <= 100 and nums[i] <= 1000 cap
    // the total at 100 windows * 100 elements * 1000 = 10^7, well inside
    // 32 bits.
    const prefix: number[] = [0];
    for (const value of nums) {
        prefix.push(prefix[prefix.length - 1] + value);
    }
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += prefix[i + 1] - prefix[Math.max(0, i - nums[i])];
    }
    return total;
}
