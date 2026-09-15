function sumOfNumbers(l: number, r: number, k: number): number {
    const MOD = 1000000007n;
    // Residue products approach 10^18 and pass 2^53, so every modular
    // operation runs in BigInt; converted back only at the return.
    const powMod = (base: bigint, exp: bigint): bigint => {
        let result = 1n;
        let b = base % MOD;
        let e = exp;
        while (e > 0n) {
            if (e & 1n) result = (result * b) % MOD;
            b = (b * b) % MOD;
            e >>= 1n;
        }
        return result;
    };
    const m = BigInt(r - l + 1);
    const digitSum = BigInt(((l + r) * (r - l + 1)) / 2);
    // A fixed position holds any one digit d of [l, r] in exactly
    // m^(k-1) of the m^k strings, so it contributes digitSum * m^(k-1) *
    // 10^p; the place weights sum to the repunit (10^k - 1) / 9, whose
    // residue is (10^k - 1) * 9^-1 by Fermat's little theorem.
    const inv9 = powMod(9n, MOD - 2n);
    const repunit = (((powMod(10n, BigInt(k)) - 1n) % MOD) * inv9) % MOD;
    return Number((digitSum * powMod(m, BigInt(k) - 1n) * repunit) % MOD);
}
