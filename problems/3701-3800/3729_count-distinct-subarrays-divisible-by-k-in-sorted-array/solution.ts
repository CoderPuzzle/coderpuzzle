function numGoodSubarrays(nums: number[], k: number): number {
    // Positional sweep: window [l, r] is good exactly when the prefixes
    // before l and through r leave the same remainder mod k. Prefix sums
    // reach 10^14 and the answer 5 * 10^9, all inside the 2^53 exact range,
    // so plain numbers stay exact.
    const residueCounts = new Map<number, number>();
    residueCounts.set(0, 1);
    let residue = 0;
    let total = 0;
    for (const value of nums) {
        residue = (residue + value) % k;
        const seen = residueCounts.get(residue) || 0;
        total += seen;
        residueCounts.set(residue, seen + 1);
    }
    // Identical value sequences repeat only inside one run of equal values:
    // a span crossing a strict increase is pinned by where it crosses and
    // how much it takes from each edge. A qualifying length L inside a run
    // of length a occupies a - L + 1 positions but counts once, so subtract
    // the a - L excess of every qualifying length. The qualifying lengths
    // are multiples of k / gcd(v, k).
    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };
    let i = 0;
    while (i < nums.length) {
        let j = i;
        while (j < nums.length && nums[j] === nums[i]) {
            j++;
        }
        const runLength = j - i;
        const step = k / gcd(nums[i], k);
        const repeated = Math.floor(runLength / step);
        total -= repeated * runLength - (step * repeated * (repeated + 1)) / 2;
        i = j;
    }
    return total;
}
