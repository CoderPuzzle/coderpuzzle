function longestBalanced(s: string): number {
    // Fixing the left end and growing the right one adds a single letter
    // per step, so the count array, the number of live letters, and the
    // largest count among them all update in constant time. Counts only
    // rise within one sweep, so the max is exact after each increment.
    const base = "a".charCodeAt(0);
    const n = s.length;
    let best = 0;
    for (let i = 0; i < n; i++) {
        const counts: number[] = new Array(26).fill(0);
        let distinct = 0,
            top = 0;
        for (let j = i; j < n; j++) {
            const c = s.charCodeAt(j) - base;
            if (counts[c] === 0) {
                distinct++;
            }
            counts[c]++;
            if (counts[c] > top) {
                top = counts[c];
            }
            // The counts sum to the window length, so they are all equal
            // exactly when their common value times the number of live
            // letters fills the length; a single live letter always wins.
            if (distinct * top === j - i + 1 && j - i + 1 > best) {
                best = j - i + 1;
            }
        }
    }
    return best;
}
