function findCommonResponse(responses: string[][]): string {
    // Deduplicate within each day first — a response repeated in the same
    // day still counts once — then tally the deduped words across days in
    // a hash map and keep the best (count, lexicographic order) seen.
    const counts = new Map<string, number>();
    for (const day of responses) {
        for (const word of new Set<string>(day)) {
            counts.set(word, (counts.get(word) ?? 0) + 1);
        }
    }
    let bestWord = "";
    let bestCount = 0;
    for (const [word, count] of counts) {
        if (count > bestCount || (count === bestCount && word < bestWord)) {
            bestWord = word;
            bestCount = count;
        }
    }
    return bestWord;
}
