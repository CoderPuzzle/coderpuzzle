function longestWord(words: string[]): string {
    // Sorted order visits every word after the word minus its last
    // character, so one sweep can grow the buildable set incrementally.
    // The comparator is explicit — never the default sort — and fully
    // orders every pair, so no sort-stability assumption can leak in.
    const sorted = [...words].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    let best = "";
    const buildable = new Set<string>();
    for (const word of sorted) {
        // Buildable by the statement's rule: the word minus its last
        // character is already buildable, and a lone letter carries the
        // empty prefix, so it needs nothing.
        if (word.length === 1 || buildable.has(word.slice(0, -1))) {
            buildable.add(word);
            // Strictly longer only: among equal lengths the first word in
            // sorted order — the lexicographically smallest — wins. The tie
            // rule lives here, in the sweep, not in sort stability.
            if (word.length > best.length) {
                best = word;
            }
        }
    }
    // Nothing buildable at all: the statement's empty-string answer.
    return best;
}
