// Reachable topping totals: start from {0}; each topping price t maps
// every sum s to s, s + t, s + 2t. Scanning that set against every base,
// the best dessert cost minimizes |b + s - target|, ties broken toward
// the smaller cost. Totals stay far below 2^53, so plain numbers hold
// every sum exactly.
function closestCost(baseCosts: number[], toppingCosts: number[], target: number): number {
    let sums = new Set<number>([0]);
    for (const t of toppingCosts) {
        const next = new Set<number>();
        for (const s of sums) {
            next.add(s);
            next.add(s + t);
            next.add(s + 2 * t);
        }
        sums = next;
    }
    let best: number | null = null;
    let bestDist = Infinity;
    for (const b of baseCosts) {
        for (const s of sums) {
            const cost = b + s;
            const dist = Math.abs(cost - target);
            if (best === null || dist < bestDist || (dist === bestDist && cost < best)) {
                best = cost;
                bestDist = dist;
            }
        }
    }
    return best as number;
}
