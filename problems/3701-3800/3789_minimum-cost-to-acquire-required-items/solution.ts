function minimumCost(cost1: number, cost2: number, costBoth: number, need1: number, need2: number): number {
    // Price each unit independently. A unit counted toward BOTH
    // requirements comes as one type 3 item or as one item of each
    // type, whichever is cheaper; a leftover unit of a single
    // requirement comes as that type's own item or as a type 3 item
    // whose spare contribution is wasted, whichever is cheaper. Units
    // never interact, so the per-unit minima sum to the global minimum.
    // The largest product is 1e9 * 2e6 = 2e15 and the total at most
    // 1e9 * 1e6 + 1e9 * 1e6 = 2e15, inside Number's exact integer range
    // of 2^53, so plain arithmetic never loses precision.
    const pairs = Math.min(need1, need2);
    const pairCost = Math.min(costBoth, cost1 + cost2);
    const rest1 = Math.min(costBoth, cost1);
    const rest2 = Math.min(costBoth, cost2);
    return pairs * pairCost + (need1 - pairs) * rest1 + (need2 - pairs) * rest2;
}
