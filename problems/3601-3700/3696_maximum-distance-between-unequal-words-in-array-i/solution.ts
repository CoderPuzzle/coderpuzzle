function maxDistance(words: string[]): number {
    // Starting best at 0 bakes in the sentinel: only a genuinely unequal
    // pair can raise it, so an all-equal array (or a single word, which
    // has no pairs at all) returns 0 untouched.
    let best = 0;
    const n = words.length;
    // Check every index pair once; each unequal pair contributes
    // j - i + 1, counting both endpoints.
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (words[i] !== words[j]) {
                best = Math.max(best, j - i + 1);
            }
        }
    }
    return best;
}
