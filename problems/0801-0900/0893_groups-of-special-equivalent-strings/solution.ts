function numSpecialEquivGroups(words: string[]): number {
    // Swaps never mix parities: even-indexed letters only trade with
    // even-indexed ones, odd with odd, so a word is exactly its two
    // sorted halves. The set counts distinct (even, odd) signatures.
    const seen = new Set<string>();
    for (const word of words) {
        const even: string[] = [];
        const odd: string[] = [];
        for (let i = 0; i < word.length; ++i) {
            if (i % 2 === 0) {
                even.push(word[i]);
            } else {
                odd.push(word[i]);
            }
        }
        seen.add(even.sort().join("") + "#" + odd.sort().join(""));
    }
    return seen.size;
}
