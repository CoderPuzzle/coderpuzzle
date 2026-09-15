function prefixConnected(words: string[], k: number): number {
    // Sharing the first k characters is transitive, so each connected
    // group is exactly one k-prefix and counting groups of size >= 2
    // is counting prefixes that occur at least twice.
    const counts = new Map<string, number>();
    for (const word of words) {
        if (word.length >= k) {
            const prefix = word.slice(0, k);
            counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
        }
    }
    // A group needs at least two words, so prefixes seen once do not
    // count; the answer is at most n <= 5000, exact as a double.
    let groups = 0;
    for (const c of counts.values()) {
        if (c >= 2) {
            groups += 1;
        }
    }
    return groups;
}
