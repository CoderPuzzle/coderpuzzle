function minimumTimeToInitialState(word: string, k: number): number {
    // After t seconds exactly t*k original characters have been removed
    // from the front; additions only ever land behind the survivors. The
    // word reverts iff nothing survives (t*k >= n) or the surviving suffix
    // word[t*k:] equals the prefix it would occupy.
    const n = word.length;
    let t = 1;
    while (t * k < n && word.slice(0, n - t * k) !== word.slice(t * k)) {
        t += 1;
    }
    return t;
}
