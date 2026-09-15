function numTilings(n: number): number {
    const MOD = 1000000007;
    if (n === 1) return 1;
    if (n === 2) return 2;
    let a = 1,
        b = 1,
        c = 2; // f(0), f(1), f(2)
    for (let i = 3; i <= n; i++) {
        const next = (2 * c + a) % MOD;
        a = b;
        b = c;
        c = next;
    }
    return c;
}
