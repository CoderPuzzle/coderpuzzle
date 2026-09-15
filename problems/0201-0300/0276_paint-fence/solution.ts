function numWays(n: number, k: number): number {
    // Rolling counts for the prefix built so far: same = its last two
    // posts share a color, diff = they differ. Seeded at the first post:
    // nothing precedes it to match, so all k colors start as "differs".
    let same = 0;
    let diff = k;
    for (let i = 1; i < n; ++i) {
        // A same-color post must follow a differing pair, and a differing
        // post picks any of the k - 1 remaining colors after anything.
        const nextSame = diff;
        diff = (same + diff) * (k - 1);
        same = nextSame;
    }
    return same + diff;
}
