function numTilePossibilities(tiles: string): number {
    // Array of 26 counts keyed by letter, not a permutation of indices:
    // identical tiles collapse into one branch, so a sequence built from
    // duplicate letters is only ever counted once.
    const counts: number[] = new Array(26).fill(0);
    for (const c of tiles) {
        counts[c.charCodeAt(0) - 65]++;
    }

    const backtrack = (): number => {
        let total = 0;
        for (let i = 0; i < 26; i++) {
            if (counts[i] === 0) continue;
            // Placing this letter is itself one new, distinct sequence.
            counts[i]--;
            total += 1 + backtrack();
            counts[i]++;
        }
        return total;
    };

    return backtrack();
}
