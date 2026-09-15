function numOfStrings(patterns: string[], word: string): number {
    // Each pattern is judged on its own: count the ones that occur as a
    // contiguous substring of word.
    let count = 0;
    for (const pattern of patterns) {
        if (word.includes(pattern)) {
            ++count;
        }
    }
    return count;
}
