function valueAfterKSeconds(n: number, k: number): number {
    // Each second turns the array into its own prefix sums, so the
    // update is one in-place running sum repeated k times. Residues
    // stay below 2^30 after every reduction, so additions remain exact.
    // After k seconds the last column has counted lattice paths, giving
    // the binomial C(n - 1 + k, k).
    const MOD = 1000000007;
    const a = new Array<number>(n).fill(1);
    for (let t = 0; t < k; ++t) {
        for (let j = 1; j < n; ++j) {
            a[j] = (a[j] + a[j - 1]) % MOD;
        }
    }
    return a[n - 1];
}
