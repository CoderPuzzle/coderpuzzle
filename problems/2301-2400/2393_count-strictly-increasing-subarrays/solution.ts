function countSubarrays(nums: number[]): number {
    // run counts strictly increasing subarrays ending at the current
    // index: it grows by one while the rise continues, resets to 1
    // otherwise. Summing counts every subarray exactly once, by its
    // right endpoint. The maximum total is n(n+1)/2 ≈ 5×10⁹ at
    // n = 10⁵ — exact in a Number (integers are exact below 2^53).
    let total = 0;
    let run = 0;
    for (let i = 0; i < nums.length; ++i) {
        if (i > 0 && nums[i - 1] < nums[i]) {
            ++run;
        } else {
            run = 1;
        }
        total += run;
    }
    return total;
}
