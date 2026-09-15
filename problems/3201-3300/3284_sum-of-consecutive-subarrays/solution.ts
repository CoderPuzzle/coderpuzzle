function getSum(nums: number[]): number {
    // Scan maximal constant-step (+1 / -1) runs left to right, carrying
    // ending, the sum of all consecutive subarrays that end at the current
    // index. Repeating the direction grows the run and extends every such
    // subarray (ending += chain * x after the increment); a unit step in a
    // new direction keeps only the fresh pair plus [x]; any other step
    // keeps only [x]. Reduced mod 1e9 + 7 each step, so every intermediate
    // stays far below 2^53 and Number arithmetic is exact.
    const MOD = 1e9 + 7;
    let total = nums[0];
    let chain = 1;
    let ending = nums[0];
    let direction = 0;
    for (let i = 1; i < nums.length; i++) {
        const d = nums[i] - nums[i - 1];
        if (d === direction && d !== 0) {
            chain++;
            ending = (ending + chain * nums[i]) % MOD;
        } else if (d === 1 || d === -1) {
            direction = d;
            chain = 2;
            ending = (nums[i - 1] + 2 * nums[i]) % MOD;
        } else {
            direction = 0;
            chain = 1;
            ending = nums[i];
        }
        total = (total + ending) % MOD;
    }
    return total;
}
