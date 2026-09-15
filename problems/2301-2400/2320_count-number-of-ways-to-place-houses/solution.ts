function countHousePlacements(n: number): number {
    // Loop sums stay far below 2^53, but the final square reaches ~10^18,
    // past double precision — BigInt keeps it exact.
    const MOD = 1000000007n;
    let prev = 1n;
    let curr = 2n;
    for (let i = 1; i < n; i++) {
        const next = (prev + curr) % MOD;
        prev = curr;
        curr = next;
    }
    return Number((curr * curr) % MOD);
}
