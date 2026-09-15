function eliminateMaximum(dist: number[], speed: number[]): number {
    // Monster i reaches the city at minute ceil(dist[i]/speed[i]) — at
    // that exact minute it already counts as a loss. The i-th shot
    // happens at minute i, so after sorting arrival minutes the answer
    // is the first position where the arrival is not strictly later
    // than the shot.
    const arrivals = dist.map((d, i) => Math.ceil(d / speed[i])).sort((a, b) => a - b);
    for (let i = 0; i < arrivals.length; ++i) {
        if (arrivals[i] <= i) return i;
    }
    return arrivals.length;
}
