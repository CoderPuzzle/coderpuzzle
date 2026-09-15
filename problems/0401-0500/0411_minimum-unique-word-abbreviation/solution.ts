function minAbbreviation(target: string, dictionary: string[]): string {
    // One integer per same-length word: bit i is set where the word's
    // letter differs from target's. An abbreviation keeping exactly the
    // positions in K collides with that word precisely when K & diff == 0,
    // so a valid K must hit every diff mask. Words of other lengths can
    // never match an abbreviation of target and are skipped outright.
    const m = target.length;
    const diffs = new Set<number>();
    for (const word of dictionary) {
        if (word.length !== m) continue;
        let mask = 0;
        for (let i = 0; i < m; i++) {
            if (word[i] !== target[i]) mask |= 1 << i;
        }
        if (mask !== 0) diffs.add(mask);
    }
    // Only minimal masks matter: a superset of another mask is hit by
    // anything that hits its subset, so it adds no constraint.
    const popcount = (x: number): number => {
        let count = 0;
        while (x) {
            x &= x - 1;
            count++;
        }
        return count;
    };
    const byWeight = [...diffs].sort((a, b) => popcount(a) - popcount(b));
    const minimal: number[] = [];
    for (const mask of byWeight) {
        if (!minimal.some((kept) => (kept & ~mask) === 0)) minimal.push(mask);
    }

    const build = (mask: number): string => {
        let abbr = "";
        let run = 0;
        for (let i = 0; i < m; i++) {
            if ((mask >> i) & 1) {
                if (run > 0) {
                    abbr += run;
                    run = 0;
                }
                abbr += target[i];
            } else {
                run++;
            }
        }
        if (run > 0) abbr += run;
        return abbr;
    };

    const full = (1 << m) - 1;
    let bestLen = m;
    let bestAbbr = target; // The bare word itself is always a valid answer.

    // walk visits kept-position sets in abbreviation-cost order; the best
    // (length, string) pair over all valid leaves is order-independent.
    const walk = (pos: number, mask: number, kept: number, runs: number, openRun: boolean, pending: number[]): void => {
        // Cost floor: letters kept, runs closed, the run still open, and the
        // one extra letter a still-unhit word will eventually force.
        const floor = kept + runs + (openRun ? 1 : 0) + (pending.length > 0 ? 1 : 0);
        if (floor > bestLen) return;
        if (pos === m) {
            if (pending.length === 0) {
                const cost = kept + runs + (openRun ? 1 : 0);
                const abbr = build(mask);
                if (cost < bestLen || (cost === bestLen && abbr < bestAbbr)) {
                    bestLen = cost;
                    bestAbbr = abbr;
                }
            }
            return;
        }
        // Abbreviate this position: a pending mask with no set bit here or
        // later can never be hit again, so the branch survives only if every
        // mask still has a bit left to aim at.
        const future = full ^ ((1 << pos) - 1);
        if (!pending.some((d) => (d & future) === 0)) {
            walk(pos + 1, mask, kept, runs, true, pending);
        }
        // Keep this letter: masks hit here are satisfied from now on.
        const still = pending.filter((d) => ((d >> pos) & 1) === 0);
        walk(pos + 1, mask | (1 << pos), kept + 1, runs + (openRun ? 1 : 0), false, still);
    };

    walk(0, 0, 0, 0, false, minimal);
    return bestAbbr;
}
