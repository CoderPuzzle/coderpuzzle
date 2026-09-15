function maxNumberOfAlloys(
    n: number,
    k: number,
    budget: number,
    composition: number[][],
    stock: number[],
    cost: number[],
): number {
    // Binary search the alloy count. Making x alloys on one machine
    // costs sum(max(0, x * composition[m][j] - stock[j]) * cost[j])
    // coins, which never decreases as x grows, so affordability is
    // monotone and the largest feasible count can be bisected. The
    // count is bounded by min(stock) + budget: the metal with the
    // smallest stock needs at least x - stock[j] units bought and any
    // unit costs at least one coin. Every machine is probed per
    // candidate count; the spend total stays at most about 2e14, far
    // below 2^53, so ordinary numbers remain exact throughout.
    const affordable = (machine: number[], count: number): boolean => {
        let spent = 0;
        for (let j = 0; j < n; j++) {
            const need = count * machine[j] - stock[j];
            if (need > 0) {
                spent += need * cost[j];
                if (spent > budget) {
                    return false;
                }
            }
        }
        return true;
    };
    let minStock = Infinity;
    for (const s of stock) {
        minStock = Math.min(minStock, s);
    }
    let best = 0;
    let low = 0;
    let high = minStock + budget;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        let ok = false;
        for (let m = 0; m < k && !ok; m++) {
            ok = affordable(composition[m], mid);
        }
        if (ok) {
            best = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return best;
}
