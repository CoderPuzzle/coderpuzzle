function shipWithinDays(weights: number[], days: number): number {
    function feasible(cap: number): boolean {
        let need = 1;
        let current = 0;
        // order fixed: greedily filling each day as full as possible
        // minimizes the day count, so this pass decides feasibility
        for (const w of weights) {
            if (current + w > cap) {
                need += 1;
                if (need > days) {
                    return false;
                }
                current = w;
            } else {
                current += w;
            }
        }
        return true;
    }

    // feasibility is monotone in capacity; lo must at least carry the
    // heaviest package, hi = total weight ships everything in one day
    let lo = Math.max(...weights);
    let hi = weights.reduce((a, b) => a + b, 0);
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        // hi always stays feasible, lo moves past infeasible midpoints,
        // so the loop ends on the least feasible capacity
        if (feasible(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
