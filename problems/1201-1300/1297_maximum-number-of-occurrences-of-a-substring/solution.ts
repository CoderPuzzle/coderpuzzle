function maxFreq(s: string, maxLetters: number, minSize: number, maxSize: number): number {
    // A length-L qualifying substring (L > minSize) has a minSize prefix
    // occurring at least as often, so only exact-minSize windows count.
    const counts = new Map<string, number>();
    let best = 0;
    for (let start = 0; start + minSize <= s.length; ++start) {
        const window = s.substring(start, start + minSize);
        if (new Set(window).size <= maxLetters) {
            const next = (counts.get(window) ?? 0) + 1;
            counts.set(window, next);
            if (next > best) best = next;
        }
    }
    return best;
}
