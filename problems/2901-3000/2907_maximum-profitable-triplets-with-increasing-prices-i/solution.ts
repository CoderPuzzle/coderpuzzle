function maxProfit(prices: number[], profits: number[]): number {
    // Fix the middle item j. Two Fenwick (binary indexed) trees over the
    // compressed price ranks answer, for every j, the maximum profit among
    // earlier items priced strictly below prices[j] and among later items
    // priced strictly above prices[j]; the right pass runs the same prefix
    // queries over reversed ranks. Every profit is >= 1, so a query result
    // of 0 means "no such item exists".
    const n = prices.length;
    const ranks = [...new Set(prices)].sort((a, b) => a - b);
    const m = ranks.length;
    const rank = new Map<number, number>(ranks.map((p, i) => [p, i + 1]));
    const query = (tree: number[], i: number): number => {
        let best = 0;
        while (i > 0) {
            if (tree[i] > best) best = tree[i];
            i -= i & -i;
        }
        return best;
    };
    const update = (tree: number[], i: number, gain: number): void => {
        while (i <= m) {
            if (gain > tree[i]) tree[i] = gain;
            i += i & -i;
        }
    };
    let tree: number[] = new Array(m + 1).fill(0);
    const left: number[] = new Array(n).fill(0);
    for (let j = 0; j < n; ++j) {
        const r = rank.get(prices[j])!;
        left[j] = query(tree, r - 1);
        update(tree, r, profits[j]);
    }
    tree = new Array(m + 1).fill(0);
    const right: number[] = new Array(n).fill(0);
    for (let j = n - 1; j >= 0; --j) {
        const r = m + 1 - rank.get(prices[j])!;
        right[j] = query(tree, r - 1);
        update(tree, r, profits[j]);
    }
    let best = -1;
    for (let j = 0; j < n; ++j) {
        if (left[j] > 0 && right[j] > 0) {
            best = Math.max(best, left[j] + profits[j] + right[j]);
        }
    }
    return best;
}
