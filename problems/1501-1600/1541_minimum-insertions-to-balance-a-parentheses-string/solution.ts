function minInsertions(s: string): number {
    let insertions = 0;
    // Number of '(' seen so far that are still waiting for their '))'.
    let openCount = 0;
    let i = 0;
    const n = s.length;
    while (i < n) {
        if (s[i] === "(") {
            openCount++;
            i++;
            continue;
        }
        // A ')' is handled together with the character right after it.
        if (i + 1 < n && s[i + 1] === ")") {
            // A full '))' pair; consume both characters at once.
            i += 2;
        } else {
            // A lone ')' with no partner right after it: charge one
            // insertion for the missing ')' and treat the pair as
            // completed on the spot.
            insertions++;
            i++;
        }
        // One closing pair has just been accounted for; it must belong to a
        // waiting '('. If none is waiting, the '(' itself is missing.
        if (openCount > 0) {
            openCount--;
        } else {
            insertions++;
        }
    }
    // Every '(' still waiting never got its '))'; each needs a full pair
    // appended.
    insertions += openCount * 2;
    return insertions;
}
