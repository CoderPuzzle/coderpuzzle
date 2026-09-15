function maxA(n: number): number {
    // best[i]: the most 'A's i presses can leave on screen. Press i is
    // either one more printed A, or the last paste after a Ctrl-A /
    // Ctrl-C pair taken at press j: the pair captures best[j] and the
    // pastes multiply it, giving the candidate best[j] * (i - j - 1).
    // j runs only to i - 3, since a pair must leave room for one paste.
    const best: number[] = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; ++i) {
        best[i] = best[i - 1] + 1;
        for (let j = 1; j < i - 2; ++j) {
            // i - j - 1 copies in all: the one already on screen plus
            // one for every paste.
            best[i] = Math.max(best[i], best[j] * (i - j - 1));
        }
    }
    return best[n];
}
