function similarPairs(words: string[]): number {
    // Similarity ignores multiplicity and order: a 26-bit signature with one
    // bit per letter identifies each character set, and counting earlier
    // occurrences of the running signature adds every eligible pair on the
    // fly.
    const counts = new Map<number, number>();
    let total = 0;
    for (const word of words) {
        let signature = 0;
        for (const ch of word) {
            signature |= 1 << (ch.charCodeAt(0) - 97);
        }
        total += counts.get(signature) ?? 0;
        counts.set(signature, (counts.get(signature) ?? 0) + 1);
    }
    return total;
}
