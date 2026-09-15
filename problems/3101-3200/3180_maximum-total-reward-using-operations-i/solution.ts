function maxTotalReward(rewardValues: number[]): number {
    // Every legal play takes its rewards in strictly increasing value
    // order — the next value must exceed a running total that already
    // contains everything taken before it — and two copies of the same
    // value can never both be used. So after sorting, reachable[t]
    // tracks achievable totals: value v extends exactly from totals
    // t < v, scanned descending so each copy is used at most once.
    // Totals stay below 2 * max(rewardValues) <= 4000 because the last
    // pick exceeds everything collected before it.
    const vals = [...rewardValues].sort((a, b) => a - b);
    const cap = 2 * vals[vals.length - 1];
    const reachable = new Array<boolean>(cap + 1).fill(false);
    reachable[0] = true;
    let best = 0;
    for (const v of vals) {
        const top = Math.min(best, v - 1);
        for (let t = top; t >= 0; --t) {
            if (!reachable[t]) continue;
            reachable[t + v] = true;
            if (t + v > best) best = t + v;
        }
    }
    return best;
}
