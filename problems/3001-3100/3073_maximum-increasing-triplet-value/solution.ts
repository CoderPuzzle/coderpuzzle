function maximumTripletValue(nums: number[]): number {
    const n = nums.length;
    // Greatest element strictly to the right of each index.
    const suffix = new Array<number>(n);
    suffix[n - 1] = nums[n - 1];
    for (let k = n - 2; k >= 0; k--) {
        suffix[k] = Math.max(suffix[k + 1], nums[k]);
    }
    // Fenwick tree over compressed ranks, storing prefix maxima of the values
    // inserted so far; query(rank - 1) yields the greatest earlier value
    // strictly smaller than nums[j].
    const distinct = Array.from(new Set(nums)).sort((a, b) => a - b);
    const rank = new Map<number, number>();
    for (let i = 0; i < distinct.length; i++) {
        rank.set(distinct[i], i + 1);
    }
    const size = distinct.length;
    const tree = new Array<number>(size + 1).fill(0);
    const update = (i: number, v: number): void => {
        for (; i <= size; i += i & -i) {
            tree[i] = Math.max(tree[i], v);
        }
    };
    const query = (i: number): number => {
        let best = 0;
        for (; i > 0; i -= i & -i) {
            best = Math.max(best, tree[i]);
        }
        return best;
    };

    let best = -Infinity;
    update(rank.get(nums[0])!, nums[0]);
    for (let j = 1; j < n - 1; j++) {
        const left = query(rank.get(nums[j])! - 1);
        if (left > 0 && nums[j] < suffix[j + 1]) {
            best = Math.max(best, left - nums[j] + suffix[j + 1]);
        }
        update(rank.get(nums[j])!, nums[j]);
    }
    return best;
}
