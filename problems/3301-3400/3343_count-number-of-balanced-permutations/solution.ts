// A balanced permutation is decided by how many copies of each digit
// land on even indices: a_d of the cnt[d] copies, with sum(a_d) =
// ceil(n/2) and sum(d * a_d) = total / 2 (the odd-index sum is then
// implied by the total), each choice contributing C(cnt[d], a_d). A
// bottom-up DP over digits with states (even slots used, even-index
// sum) accumulates those binomial products. Arranging the two chosen
// multisets over the even and odd slots multiplies by even_count! *
// odd_count! / cnt[d]!, folded in via one modular inverse at the end.
// All arithmetic is modulo 1e9 + 7, iterative — no recursion.
function countBalancedPermutations(num: string): number {
    const MOD = 1000000007;
    // Residues stay below 2^30, but a raw product reaches 2^60, past
    // Number's exact-integer range — mulmod splits one side into two
    // 15-bit halves so every product stays below 2^46.
    const mulmod = (a: number, b: number): number => {
        const hi = Math.floor(a / 32768);
        const lo = a - hi * 32768;
        return (((hi * b) % MOD) * 32768 + ((lo * b) % MOD)) % MOD;
    };
    const n = num.length;
    const cnt = new Array(10).fill(0);
    for (let i = 0; i < n; i++) cnt[+num[i]]++;
    let total = 0;
    for (let d = 0; d < 10; d++) total += d * cnt[d];
    if (total % 2 === 1) return 0;
    const evenCount = (n + 1) >> 1;
    const half = total >> 1;
    const binom: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= n; i++) {
        binom[i][0] = 1;
        for (let j = 1; j <= i; j++) {
            binom[i][j] = (binom[i - 1][j - 1] + binom[i - 1][j]) % MOD;
        }
    }
    let dp: number[][] = Array.from({ length: evenCount + 1 }, () => new Array(half + 1).fill(0));
    dp[0][0] = 1;
    for (let d = 0; d < 10; d++) {
        const c = cnt[d];
        if (c === 0) continue;
        const ndp: number[][] = Array.from({ length: evenCount + 1 }, () => new Array(half + 1).fill(0));
        for (let k = 0; k <= evenCount; k++) {
            for (let s = 0; s <= half; s++) {
                const v = dp[k][s];
                if (v === 0) continue;
                for (let j = 0; j <= c && k + j <= evenCount && s + d * j <= half; j++) {
                    ndp[k + j][s + d * j] = (ndp[k + j][s + d * j] + mulmod(v, binom[c][j])) % MOD;
                }
            }
        }
        dp = ndp;
    }
    const fact = new Array(n + 1).fill(1);
    for (let i = 2; i <= n; i++) fact[i] = mulmod(fact[i - 1], i);
    let slotWays = mulmod(fact[evenCount], fact[n - evenCount]);
    let denom = 1;
    for (let d = 0; d < 10; d++) denom = mulmod(denom, fact[cnt[d]]);
    let inv = 1;
    let base = denom;
    let exp = MOD - 2;
    while (exp > 0) {
        if (exp % 2 === 1) inv = mulmod(inv, base);
        base = mulmod(base, base);
        exp = Math.floor(exp / 2);
    }
    return mulmod(mulmod(dp[evenCount][half], slotWays), inv);
}
