function minimumOperationsToMakeKPeriodic(word: string, k: number): number {
    // An operation copies one existing k-block over another, so the set
    // of block contents only shrinks and every block must end up equal to
    // some original block. Keeping the most frequent one untouched, each
    // of the other blocks is fixed by a single copy.
    const counts = new Map<string, number>();
    let best = 0;
    for (let i = 0; i < word.length; i += k) {
        const block = word.slice(i, i + k);
        const next = (counts.get(block) ?? 0) + 1;
        counts.set(block, next);
        if (next > best) best = next;
    }
    return word.length / k - best;
}
