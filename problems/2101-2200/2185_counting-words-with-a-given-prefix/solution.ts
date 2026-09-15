function prefixCount(words: string[], pref: string): number {
    // Straight scan: count the words whose leading characters match pref
    // exactly.
    let count = 0;
    for (const word of words) {
        if (word.startsWith(pref)) {
            ++count;
        }
    }
    return count;
}
