function maxSubsequence(nums: number[], k: number): number[] {
    const indices = Array.from({ length: nums.length }, (_, index) => index);
    indices.sort((left, right) => nums[right] - nums[left] || left - right);
    const chosen = indices.slice(0, k);
    chosen.sort((left, right) => left - right);
    return chosen.map((index) => nums[index]);
}
