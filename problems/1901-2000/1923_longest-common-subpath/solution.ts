function longestCommonSubpath(n: number, paths: number[][]): number {
    // Two independent moduli combined into one key make an accidental
    // collision astronomically unlikely.
    const MOD1 = 1000000007;
    const MOD2 = 1000000009;
    const BASE = 1000003;

    function exists(length: number): boolean {
        if (length === 0) return true;
        let common: Set<number> | null = null;
        for (const path of paths) {
            if (path.length < length) return false;
            let h1 = 0,
                h2 = 0;
            let power1 = 1,
                power2 = 1;
            // +1 per city id so a run of city 0 never hashes to the all-zero value.
            for (let i = 0; i < length; i++) {
                h1 = (h1 * BASE + path[i] + 1) % MOD1;
                h2 = (h2 * BASE + path[i] + 1) % MOD2;
                power1 = (power1 * BASE) % MOD1;
                power2 = (power2 * BASE) % MOD2;
            }
            const hashes = new Set<number>();
            hashes.add(h1 * MOD2 + h2);
            // Roll the window: multiply by base, drop the outgoing digit
            // weighted by BASE^L, add the incoming digit (constant per step).
            for (let j = length; j < path.length; j++) {
                const out1 = ((path[j - length] + 1) * power1) % MOD1;
                const out2 = ((path[j - length] + 1) * power2) % MOD2;
                h1 = (((h1 * BASE - out1) % MOD1) + MOD1) % MOD1;
                h2 = (((h2 * BASE - out2) % MOD2) + MOD2) % MOD2;
                h1 = (h1 + path[j] + 1) % MOD1;
                h2 = (h2 + path[j] + 1) % MOD2;
                hashes.add(h1 * MOD2 + h2);
            }
            // The first path seeds the set; each later path intersects into
            // it, bailing out the moment the intersection empties.
            if (common === null) {
                common = hashes;
            } else {
                const next = new Set<number>();
                common.forEach((key) => {
                    if (hashes.has(key)) next.add(key);
                });
                common = next;
                if (common.size === 0) return false;
            }
        }
        return common !== null && common.size > 0;
    }

    let lo = 0;
    let hi = Math.min(...paths.map((p) => p.length));
    // Existence is monotone in L (any prefix of a common subpath is common),
    // so upper-mid binary search converges on the maximum feasible length.
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (exists(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
}
