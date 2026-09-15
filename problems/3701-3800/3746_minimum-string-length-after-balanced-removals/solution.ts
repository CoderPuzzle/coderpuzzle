function minLengthAfterRemovals(s: string): number {
    // Every operation deletes one 'a' together with one 'b', so the difference
    // between the two counts never changes; while both letters remain some
    // adjacent pair differs, and deleting such pairs one after another boils
    // the string down to exactly that difference.
    let countA = 0;
    for (const ch of s) {
        if (ch === "a") {
            countA++;
        }
    }
    const countB = s.length - countA;
    return Math.abs(countA - countB);
}
