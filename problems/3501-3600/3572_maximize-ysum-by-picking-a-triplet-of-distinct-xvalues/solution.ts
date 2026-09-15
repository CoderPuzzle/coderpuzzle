function maxSumDistinctTriplet(x: number[], y: number[]): number {
    // Each x-value can enter the triplet at most once, so only its best
    // y matters: keep the maximum y per distinct x in a hash map.
    const best = new Map<number, number>();
    for (let i = 0; i < x.length; ++i) {
        const seen = best.get(x[i]);
        if (seen === undefined || y[i] > seen) best.set(x[i], y[i]);
    }
    if (best.size < 3) return -1;
    // The answer is the sum of the three largest per-x maxima.
    const maxima = [...best.values()].sort((a, b) => b - a);
    return maxima[0] + maxima[1] + maxima[2];
}
