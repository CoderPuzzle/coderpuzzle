function countGoodNumbers(n: number): number {
    // Positions split by parity: (n+1)//2 even indices each hold one of
    // the 5 even digits, n//2 odd indices one of the 4 prime digits. The
    // product 5^e * 4^o is folded by iterative square-and-multiply, so n
    // up to 10^15 costs ~50 modular multiplications.
    // BigInt is mandatory: (10^9+6)^2 overflows Number's exact 2^53 range.
    const MOD = 1000000007n;
    const power = (base: bigint, exp: bigint): bigint => {
        let result = 1n;
        let b = base % MOD;
        while (exp > 0n) {
            if ((exp & 1n) !== 0n) result = (result * b) % MOD;
            b = (b * b) % MOD;
            exp >>= 1n;
        }
        return result;
    };
    const big = BigInt(n);
    return Number((power(5n, (big + 1n) / 2n) * power(4n, big / 2n)) % MOD);
}
