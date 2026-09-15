function numOfWays(n: number): number {
    const MOD = 1000000007;
    let a = 6;
    let b = 6;
    for (let i = 1; i < n; i++) {
        const nextA = (3 * a + 2 * b) % MOD;
        const nextB = (2 * a + 2 * b) % MOD;
        a = nextA;
        b = nextB;
    }
    return (a + b) % MOD;
}
