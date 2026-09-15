function canDistribute(nums: number[], quantity: number[]): boolean {
    // A customer's integers must all be equal, so each customer draws
    // from a single value — and a value with count c serves any group
    // of customers whose quantities sum to at most c, with several
    // customers free to share one value. Only the counts matter, m is
    // at most 10, and there are at most 50 distinct values, so a
    // subset DP over customer bitmasks, one frequency value at a
    // time, covers every distribution.
    const counts = new Map<number, number>();
    for (const value of nums) counts.set(value, (counts.get(value) ?? 0) + 1);
    const m = quantity.length;
    const full = (1 << m) - 1;
    // subsetSums[mask] = total amount ordered by the customers in mask.
    const subsetSums: number[] = new Array(1 << m).fill(0);
    for (let mask = 1; mask <= full; ++mask) {
        const low = mask & -mask;
        subsetSums[mask] = subsetSums[mask ^ low] + quantity[31 - Math.clz32(low)];
    }
    // reachable[mask]: the customers in mask are served by the values
    // processed so far. Each value either stays unused (the previous
    // layer carries over) or takes one submask of the still-unsatisfied
    // customers whose quantity sum fits within its count.
    let reachable: boolean[] = new Array(1 << m).fill(false);
    reachable[0] = true;
    for (const count of counts.values()) {
        const next = reachable.slice();
        for (let mask = 0; mask <= full; ++mask) {
            if (!reachable[mask]) continue;
            const available = full ^ mask;
            for (let submask = available; submask !== 0; submask = (submask - 1) & available) {
                if (subsetSums[submask] <= count) next[mask | submask] = true;
            }
        }
        reachable = next;
    }
    return reachable[full];
}
