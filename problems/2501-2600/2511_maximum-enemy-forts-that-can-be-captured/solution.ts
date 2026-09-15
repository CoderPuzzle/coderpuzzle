function captureForts(forts: number[]): number {
    // A move is only possible between two non-zero entries separated by
    // enemy forts, and it captures when the two ends differ (your fort
    // 1 -> empty -1 in either direction). One scan remembers the
    // previous non-zero position; every new non-zero closes the stretch
    // of zeros since then, so the best differing gap seen is exactly the
    // most enemy forts capturable.
    let best = 0;
    let last = -1;
    for (let i = 0; i < forts.length; i++) {
        if (forts[i] === 0) continue;
        if (last >= 0 && forts[i] !== forts[last]) {
            best = Math.max(best, i - last - 1);
        }
        last = i;
    }
    return best;
}
