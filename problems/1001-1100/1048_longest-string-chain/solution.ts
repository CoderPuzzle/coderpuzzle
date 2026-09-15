function longestStrChain(words: string[]): number {
    // dedupe first (duplicates never extend each other), then process
    // shortest first: every one-deletion predecessor is already in dp
    // when its successor is reached
    const unique = Array.from(new Set(words));
    unique.sort((a, b) => a.length - b.length);
    const dp = new Map<string, number>();
    let best = 0;
    for (const word of unique) {
        // dp[word] = longest chain ending at word: 1 + the best value
        // among its one-deletion variants present in dp (1 = alone)
        let current = 1;
        for (let i = 0; i < word.length; i++) {
            const predecessor = word.slice(0, i) + word.slice(i + 1);
            const prev = dp.get(predecessor);
            if (prev !== undefined && prev + 1 > current) {
                current = prev + 1;
            }
        }
        dp.set(word, current);
        if (current > best) {
            best = current;
        }
    }
    return best;
}
