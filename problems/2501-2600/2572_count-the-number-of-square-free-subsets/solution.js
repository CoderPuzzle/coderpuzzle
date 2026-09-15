/**
 * @param {number[]} nums
 * @return {number}
 */
var squareFreeSubsets = function (nums) {
    const MOD = 1000000007;
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    const counts = new Array(31).fill(0);
    for (const v of nums) {
        counts[v]++;
    }
    // dp[mask] = ways to pick a square-free set of numbers (at most one copy
    // of each value, values > 1) whose combined prime factors are `mask`.
    let dp = new Array(1 << 10).fill(0);
    dp[0] = 1;
    for (let value = 2; value <= 30; value++) {
        const cnt = counts[value];
        if (cnt === 0) {
            continue;
        }
        let mask = 0;
        let usable = true;
        for (let i = 0; i < 10; i++) {
            const p = primes[i];
            if (value % p === 0) {
                if (value % (p * p) === 0) {
                    usable = false;
                    break;
                }
                mask += Math.pow(2, i);
            }
        }
        if (!usable) {
            continue; // contains a squared prime factor; never usable
        }
        const ndp = dp.slice();
        for (let m = 0; m < 1 << 10; m++) {
            if (dp[m] !== 0 && (m & mask) === 0) {
                const t = m | mask;
                ndp[t] = (ndp[t] + dp[m] * cnt) % MOD;
            }
        }
        dp = ndp;
    }

    let ways = 0;
    for (const x of dp) {
        ways = (ways + x) % MOD;
    }
    const ones = counts[1];
    if (ones > 0) {
        let factor = 1;
        for (let i = 0; i < ones; i++) {
            factor = (factor * 2) % MOD;
        }
        ways = (ways * factor) % MOD;
    }
    ways = (((ways - 1) % MOD) + MOD) % MOD; // drop the empty subset
    return ways;
};
