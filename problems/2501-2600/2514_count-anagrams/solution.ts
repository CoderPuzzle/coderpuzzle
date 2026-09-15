function countAnagrams(s: string): number {
    // Product over words of the multinomial len!/prod(count!). Modular
    // products of two ~2^30 residues exceed 2^53, so every multiply runs
    // in BigInt; the final residue fits a plain number.
    const MOD = 1000000007n;
    const modPow = (base: bigint, exp: bigint): bigint => {
        let result = 1n;
        base %= MOD;
        while (exp > 0n) {
            if (exp & 1n) result = (result * base) % MOD;
            base = (base * base) % MOD;
            exp >>= 1n;
        }
        return result;
    };
    const factMod = (n: number): bigint => {
        let result = 1n;
        for (let i = 2n; i <= BigInt(n); ++i) result = (result * i) % MOD;
        return result;
    };
    // Inverse factorial for one letter count via Fermat's little theorem.
    const inverseFactorMod = (count: number): bigint => modPow(factMod(count), MOD - 2n);
    let answer = 1n;
    for (const word of s.split(" ")) {
        const counts = new Array<number>(26).fill(0);
        for (let i = 0; i < word.length; ++i) {
            counts[word.charCodeAt(i) - 97]++;
        }
        let term = factMod(word.length);
        for (const count of counts) {
            if (count > 1) term = (term * inverseFactorMod(count)) % MOD;
        }
        answer = (answer * term) % MOD;
    }
    return Number(answer);
}
