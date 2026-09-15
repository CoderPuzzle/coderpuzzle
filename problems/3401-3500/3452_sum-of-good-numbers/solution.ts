function sumOfGoodNumbers(nums: number[], k: number): number {
    // One sweep: an element is good when it strictly beats the neighbors
    // that exist at distance k; a missing neighbor never blocks it.
    const n = nums.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        const leftOk = i - k < 0 || nums[i] > nums[i - k];
        const rightOk = i + k >= n || nums[i] > nums[i + k];
        if (leftOk && rightOk) {
            total += nums[i];
        }
    }
    return total;
}
