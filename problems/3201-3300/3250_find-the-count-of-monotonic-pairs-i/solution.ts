function countOfPairs(nums: number[]): number {
    // A pair is fixed once arr1 is chosen (arr2[i] = nums[i] - arr1[i]);
    // its rules collapse onto arr1: 0 <= arr1[i] <= nums[i], arr1
    // non-decreasing, and arr2 non-increasing, which together give
    // arr1[i] >= arr1[i - 1] + max(0, nums[i] - nums[i - 1]).
    //
    // pref[v] is the inclusive prefix sum of dp over values, so row i
    // reads pref[v - d] per value and is re-summed into the next pref.
    // All values stay far below 2^53, so Number arithmetic is exact.
    const MOD = 1e9 + 7;
    let pref: number[] = [];
    for (let v = 0; v <= nums[0]; v++) pref.push(v + 1); // dp[v] = 1
    for (let i = 1; i < nums.length; i++) {
        const d = Math.max(0, nums[i] - nums[i - 1]);
        const next: number[] = [];
        let acc = 0;
        for (let v = 0; v <= nums[i]; v++) {
            const dp = v >= d ? pref[v - d] : 0;
            acc = (acc + dp) % MOD;
            next.push(acc);
        }
        pref = next;
    }
    return pref[pref.length - 1];
}
