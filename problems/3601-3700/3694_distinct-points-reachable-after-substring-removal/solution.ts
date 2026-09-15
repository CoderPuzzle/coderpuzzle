function distinctPoints(s: string, k: number): number {
    // Moves add like vectors, so the endpoint left after deleting a window
    // is the full-walk endpoint minus the window's own displacement — only
    // window sums matter, never the re-walk.
    const DX: Record<string, number> = { U: 0, D: 0, L: -1, R: 1 };
    const DY: Record<string, number> = { U: 1, D: -1, L: 0, R: 0 };
    let tx = 0,
        ty = 0;
    for (const ch of s) {
        tx += DX[ch];
        ty += DY[ch];
    }
    // Slide the length-k window, updating its displacement in O(1) per step
    // — drop the outgoing move, pick up the incoming one — and collect the
    // endpoint every deletion produces.
    let wx = 0,
        wy = 0;
    for (let i = 0; i < k; i++) {
        wx += DX[s[i]];
        wy += DY[s[i]];
    }
    const seen = new Set<string>();
    for (let i = 0; i + k <= s.length; i++) {
        // Components stay in [-n, n], so the joined key is short and exact.
        seen.add(`${tx - wx},${ty - wy}`);
        if (i + k < s.length) {
            wx += DX[s[i + k]] - DX[s[i]];
            wy += DY[s[i + k]] - DY[s[i]];
        }
    }
    return seen.size;
}
