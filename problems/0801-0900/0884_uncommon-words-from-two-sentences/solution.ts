function uncommonFromSentences(s1: string, s2: string): string[] {
    // The pinned order is s1's words then s2's, and joining the
    // sentences with one space makes a single stream in that order.
    const words = (s1 + " " + s2).split(" ");
    const counts = new Map<string, number>();
    for (const word of words) {
        counts.set(word, (counts.get(word) || 0) + 1);
    }
    // An uncommon word occurs exactly once overall, so emitting it at its
    // only occurrence is first-appearance order within each sentence —
    // no sort, no seen-list, no hash iteration order.
    return words.filter((word) => counts.get(word) === 1);
}
