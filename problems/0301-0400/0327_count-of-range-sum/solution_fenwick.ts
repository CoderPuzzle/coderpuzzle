function countRangeSum(nums: number[], lower: number, upper: number): number {
    const n = nums.length;
    // Range sums become pairs: count i < j with
    // prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
    const prefix: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    // Fenwick tree over the coordinate-compressed prefix values: rank r
    // (1-based) counts how many inserted prefixes carry ranks[r - 1].
    const ranks: number[] = [...new Set<number>(prefix)].sort((a, b) => a - b);
    const m = ranks.length;
    const tree = new Int32Array(m + 1);
    // Number of ranks at most bound.
    const uptoRank = (bound: number): number => {
        let lo = 0,
            hi = m;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (ranks[mid] <= bound) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };
    const add = (value: number): void => {
        for (let rank = uptoRank(value); rank <= m; rank += rank & -rank) {
            tree[rank]++;
        }
    };
    const countAtMost = (bound: number): number => {
        let total = 0;
        for (let rank = uptoRank(bound); rank > 0; rank -= rank & -rank) {
            total += tree[rank];
        }
        return total;
    };
    let count = 0;
    add(prefix[0]);
    for (let j = 1; j <= n; j++) {
        const p = prefix[j];
        // An earlier prefix e qualifies when lower <= p - e <= upper,
        // i.e. e lies in [p - upper, p - lower]; both bounds come off
        // the tree as rank-prefix counts.
        count += countAtMost(p - lower) - countAtMost(p - upper - 1);
        // Insert only after querying, so a prefix never pairs itself.
        add(p);
    }
    return count;
}
