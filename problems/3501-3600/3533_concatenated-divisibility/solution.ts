function concatenatedDivisibility(nums: number[], k: number): number[] {
    const n = nums.length;
    const lens: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
        lens[i] = String(nums[i]).length;
    }
    const pow10: number[] = new Array(8);
    pow10[0] = 1;
    for (let i = 1; i < 8; i++) pow10[i] = pow10[i - 1] * 10;

    const full = (1 << n) - 1;
    // dp[mask][rem]: after using `mask` with prefix remainder rem, can the
    // unused numbers finish the concatenation divisible by k?
    const dp: boolean[][] = [];
    for (let mask = 0; mask <= full; mask++) dp.push(new Array(k).fill(false));
    // anchor: everything used and remainder 0 is already a valid finish
    dp[full][0] = true;
    // fill masks in decreasing order so transitions read more-used masks
    for (let mask = full - 1; mask >= 0; mask--) {
        for (let rem = 0; rem < k; rem++) {
            for (let i = 0; i < n; i++) {
                if (((mask >> i) & 1) === 0) {
                    // appending nums[i] shifts rem to (rem*10^len + x) mod k
                    const nrem = (rem * pow10[lens[i]] + nums[i]) % k;
                    if (dp[mask | (1 << i)][nrem]) {
                        dp[mask][rem] = true;
                        break;
                    }
                }
            }
        }
    }

    if (!dp[0][0]) return [];

    // reconstruction: greedily take the smallest unused number that keeps
    // the state completable — safe because the DP marks exactly those
    const order: number[] = Array.from({ length: n }, (_, i) => i);
    order.sort((a, b) => nums[a] - nums[b] || a - b);
    const res: number[] = [];
    let mask = 0;
    let rem = 0;
    for (let step = 0; step < n; step++) {
        for (const i of order) {
            if (((mask >> i) & 1) === 0) {
                const nrem = (rem * pow10[lens[i]] + nums[i]) % k;
                if (dp[mask | (1 << i)][nrem]) {
                    res.push(nums[i]);
                    mask |= 1 << i;
                    rem = nrem;
                    break;
                }
            }
        }
    }
    return res;
}
