function sumAndMultiply(s: string, queries: number[][]): number[] {
    // Prefix arrays over the NON-ZERO digits: prefVal keeps the value
    // mod M of concatenating them, prefSum their digit sum, prefCnt
    // their count. The compressed substring s[l..r] is the slice of the
    // non-zero sequence between indexes cnt[l] and cnt[r+1]; its value is
    // recoverable from the two prefix values with one pow10 shift, and its
    // digit sum is a plain prefix difference (zeros add 0 to both).
    // prefVal[l] * pow10[k] can reach ~1e18, above the 2^53 exactness bound,
    // so mulMod splits one factor into 15-bit halves: a1 * b < 3.1e13,
    // ((a1 * b) % M) * 32768 < 3.3e13, and a0 * b < 3.3e13 — every
    // intermediate stays far below 2^53, so all math is exact.
    const MOD = 1000000007;
    const mulMod = (a: number, b: number): number => {
        const a1 = Math.floor(a / 32768);
        const a0 = a - a1 * 32768;
        return (((((a1 * b) % MOD) * 32768 + a0 * b) % MOD) + MOD) % MOD;
    };
    const n = s.length;
    const prefVal: number[] = new Array(n + 1).fill(0);
    const prefSum: number[] = new Array(n + 1).fill(0);
    const prefCnt: number[] = new Array(n + 1).fill(0);
    const pow10: number[] = new Array(n + 1).fill(1);
    for (let i = 0; i < n; i++) {
        const d = s.charCodeAt(i) - 48;
        prefVal[i + 1] = prefVal[i];
        prefSum[i + 1] = prefSum[i] + d;
        prefCnt[i + 1] = prefCnt[i];
        pow10[i + 1] = (pow10[i] * 10) % MOD;
        if (s.charCodeAt(i) !== 48) {
            prefVal[i + 1] = (prefVal[i] * 10 + d) % MOD;
            prefCnt[i + 1] += 1;
        }
    }
    return queries.map(([l, r]) => {
        const k = prefCnt[r + 1] - prefCnt[l];
        // x = the concatenation of the k non-zero digits in s[l..r];
        // prefVal[r+1] = prefVal[l] * 10^k + x, so solve for x.
        const x = (prefVal[r + 1] - mulMod(prefVal[l], pow10[k])) % MOD;
        const digitSum = prefSum[r + 1] - prefSum[l];
        // digitSum <= 9 * 10^5 and x < MOD, so x * digitSum < 9e14 < 2^53.
        return (((x + MOD) % MOD) * digitSum) % MOD;
    });
}
