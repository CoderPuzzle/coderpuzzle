function binaryGap(n: number): number {
    // One pass over the bits, low to high, remembering the index of the
    // most recent 1: each later 1 offers its distance to that index as a
    // candidate, and the answer is the largest such distance. n fits in
    // thirty bits under the bound, and the zeros past the final 1 close
    // no pair — they advance the index but are never measured.
    let best = 0;
    let previous = -1;
    let index = 0;
    while (n !== 0) {
        if (n & 1) {
            if (previous >= 0) {
                best = Math.max(best, index - previous);
            }
            previous = index;
        }
        n >>>= 1;
        ++index;
    }
    return best;
}
