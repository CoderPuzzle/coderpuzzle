function countCoprime(mat: number[][]): number {
    // f[d] counts selections whose picks are ALL divisible by d; rows
    // constrain picks independently, so it factors into a product of
    // per-row multiple-counts. Mobius inversion turns those f(d) into
    // the exact gcd-1 count: answer = sum(mu(d) * f(d)).
    let top = 0;
    for (const row of mat) {
        for (const v of row) top = Math.max(top, v);
    }
    // mu[j] via the identity "sum of mu over the divisors of j is 1
    // exactly for j == 1": seed mu[1] and subtract down the multiples.
    const mu: number[] = new Array(top + 1).fill(0);
    mu[1] = 1;
    for (let i = 1; i <= top; ++i) {
        for (let j = 2 * i; j <= top; j += i) {
            mu[j] -= mu[i];
        }
    }
    // Reduced factors keep f[d] below the modulus (~2^30) and every row
    // count is at most 150 (< 2^8), so each multiply lands near 2^38 —
    // far inside the 2^53 range doubles represent exactly; the signed
    // total is bounded by 150 * modulus likewise.
    const MOD = 1_000_000_007;
    const f: number[] = new Array(top + 1).fill(1);
    const freq: number[] = new Array(top + 1).fill(0);
    for (const row of mat) {
        for (const v of row) freq[v]++;
        for (let d = 1; d <= top; ++d) {
            let count = 0;
            for (let multiple = d; multiple <= top; multiple += d) {
                count += freq[multiple];
            }
            f[d] = (f[d] * count) % MOD;
        }
        for (const v of row) freq[v]--;
    }
    let answer = 0;
    for (let d = 0; d <= top; ++d) {
        answer += mu[d] * f[d];
    }
    return ((answer % MOD) + MOD) % MOD;
}
