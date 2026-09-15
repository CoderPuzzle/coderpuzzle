function sumDistance(nums: number[], s: string, d: number): number {
    // Collisions only swap identities, so final positions are x +/- d.
    const MOD = 1000000007;
    const pos = nums.map((x, i) => (s[i] === "R" ? x + d : x - d)).sort((a, b) => a - b);
    let total = 0;
    let prefix = 0;
    for (let i = 0; i < pos.length; i++) {
        const p = pos[i];
        total += p * i - prefix;
        total %= MOD;
        prefix += p;
    }
    return ((total % MOD) + MOD) % MOD;
}
