function closestTarget(words: string[], target: string, startIndex: number): number {
    // Going either way around the ring, a match at distance d (forward)
    // is also n - d backward, so each matching index yields
    // min(d, n - d); take the smallest over all matches.
    const n = words.length;
    let best = -1;
    for (let i = 0; i < n; ++i) {
        if (words[i] !== target) continue;
        const gap = Math.abs(i - startIndex);
        const d = Math.min(gap, n - gap);
        if (best === -1 || d < best) best = d;
    }
    return best;
}
