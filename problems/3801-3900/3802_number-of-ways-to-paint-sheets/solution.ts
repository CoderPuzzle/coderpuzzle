function numberOfWays(n: number, limit: number[]): number {
    const MOD = 1000000007n;
    const m = limit.length;
    const a = [...limit].sort((x, y) => x - y);
    // numGe(t): colors whose limit reaches t — a lower-bound walk over the
    // sorted caps.
    const numGe = (t: number): number => {
        let lo = 0;
        let hi = m;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (a[mid] < t) lo = mid + 1;
            else hi = mid;
        }
        return m - lo;
    };
    // Ways for one split length x: ordered pairs of distinct colors whose
    // caps cover x and n - x; the i == j diagonal would need a single cap
    // to cover max(x, n - x). Stays below 10^10, exact in doubles.
    const ways = (x: number): number => numGe(x) * numGe(n - x) - numGe(Math.max(x, n - x));
    // ways(x) is a step function whose flips sit at 1, n, the max()
    // switch ceil(n / 2), L + 1 and n - L: one representative per
    // breakpoint run, scaled by the run length, covers 1..n-1.
    const points = new Set<number>([1, n, Math.ceil(n / 2)]);
    for (const cap of a) {
        for (const candidate of [cap + 1, n - cap]) {
            if (candidate >= 1 && candidate <= n) points.add(candidate);
        }
    }
    const ordered = [...points].sort((x, y) => x - y);
    // The reduced count times a run length up to 10^9 passes 2^53, so that
    // one product runs in BigInt.
    let total = 0n;
    for (let i = 1; i < ordered.length; i++) {
        const run = ordered[i] - ordered[i - 1];
        total = (total + BigInt(ways(ordered[i - 1]) % 1000000007) * BigInt(run)) % MOD;
    }
    return Number(total);
}
