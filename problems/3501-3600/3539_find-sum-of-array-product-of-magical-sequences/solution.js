/**
 * @param {number} m
 * @param {number} k
 * @param {number[]} nums
 * @return {number}
 */
var magicalSum = function (m, k, nums) {
    // Forward DP over the indices of nums. State (j, b, mask) after a
    // prefix of indices: j sequence slots filled, b set bits of the sum
    // already finalized (every bit below the current index is fixed, since
    // later terms only add multiples of 2^i), and mask = partial sum >> i,
    // the carry window of not-yet-settled high bits (< 2^5).
    const MOD = 1000000007;
    // Split multiplication: both factors are < 2^30, so the partial
    // products stay below 2^53 and Number arithmetic stays exact.
    const mulmod = (a, b) => {
        const b1 = b % 32768;
        const b2 = (b - b1) / 32768;
        return (a * b1 + ((a * b2) % MOD) * 32768) % MOD;
    };
    const n = nums.length;
    // comb[a][c]: ways to scatter c copies of index i into the a = m - j
    // sequence slots still unassigned.
    const comb = Array.from({ length: m + 1 }, () => new Array(m + 1).fill(0));
    for (let a = 0; a <= m; a++) {
        comb[a][0] = 1;
        for (let c = 1; c <= a; c++) comb[a][c] = (comb[a - 1][c - 1] + comb[a - 1][c]) % MOD;
    }
    // pw[i][c] = nums[i]^c mod MOD (split-multiplied: raw powers reach 1e16).
    const pw = Array.from({ length: n }, () => new Array(m + 1).fill(1));
    for (let i = 0; i < n; i++) for (let c = 1; c <= m; c++) pw[i][c] = mulmod(pw[i][c - 1], nums[i]);
    const pc = (x) => {
        let count = 0;
        while (x) {
            count += x & 1;
            x >>= 1;
        }
        return count;
    };
    let dp = Array.from({ length: m + 1 }, () => Array.from({ length: m + 1 }, () => new Array(32).fill(0)));
    dp[0][0][0] = 1;
    for (let i = 0; i < n; i++) {
        const ndp = Array.from({ length: m + 1 }, () => Array.from({ length: m + 1 }, () => new Array(32).fill(0)));
        for (let j = 0; j <= m; j++) {
            for (let b = 0; b <= m; b++) {
                for (let mask = 0; mask < 32; mask++) {
                    const v = dp[j][b][mask];
                    if (v === 0) continue;
                    for (let c = 0; c <= m - j; c++) {
                        const t = mask + c;
                        const nb = b + (t & 1);
                        // Set bits of a sum of j+c powers never exceed j+c:
                        // prune lanes that can no longer reach k.
                        if (nb + pc(t >> 1) > j + c) continue;
                        const add = mulmod(mulmod(v, comb[m - j][c]), pw[i][c]);
                        ndp[j + c][nb][t >> 1] = (ndp[j + c][nb][t >> 1] + add) % MOD;
                    }
                }
            }
        }
        dp = ndp;
    }
    // After the last index, mask holds every remaining high bit: the total
    // set-bit count of the sum is b + popcount(mask).
    let ans = 0;
    for (let b = 0; b <= m; b++)
        for (let mask = 0; mask < 32; mask++) if (b + pc(mask) === k) ans = (ans + dp[m][b][mask]) % MOD;
    return ans;
};
