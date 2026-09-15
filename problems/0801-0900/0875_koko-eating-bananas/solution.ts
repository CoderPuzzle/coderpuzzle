function minEatingSpeed(piles: number[], h: number): number {
    // Pile p costs ceil(p / k) hours; hours(k) only shrinks as k
    // grows, so feasibility is a threshold.
    const hoursNeeded = (k: number): number => {
        let total = 0;
        for (const pile of piles) {
            total += Math.ceil(pile / k);
        }
        return total;
    };
    // Range [1, max(piles)]: the max speed empties any pile in a
    // single hour, and h >= piles.length makes it always feasible.
    let lo = 1;
    let hi = Math.max(...piles);
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        // Lower-bound bisection: feasible means the answer is mid
        // or smaller; infeasible raises lo. Exiting, lo is the
        // smallest feasible speed.
        if (hoursNeeded(mid) <= h) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
