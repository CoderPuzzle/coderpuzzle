function areOccurrencesEqual(s: string): boolean {
    // Every present character must share one frequency, so the set of the
    // per-character counts has size one.
    const counts = new Map<string, number>();
    for (const ch of s) {
        counts.set(ch, (counts.get(ch) || 0) + 1);
    }
    return new Set(counts.values()).size === 1;
}
