function wordSubsets(words1: string[], words2: string[]): string[] {
    // One slot per letter: "aba" -> [2, 1, 0, ...].
    const counts = (s: string): number[] => {
        const c = new Array<number>(26).fill(0);
        for (let i = 0; i < s.length; i++) {
            c[s.charCodeAt(i) - 97]++;
        }
        return c;
    };

    // Collapse words2 to a single requirement vector: per letter, the max
    // count any one b demands. Covering the max covers every b, because
    // each b is checked independently by the definition.
    const need = new Array<number>(26).fill(0);
    for (const b of words2) {
        const cb = counts(b);
        for (let i = 0; i < 26; i++) {
            need[i] = Math.max(need[i], cb[i]);
        }
    }

    // A word is universal iff its counts dominate the collapsed demand
    // everywhere; survivors keep their input order.
    return words1.filter((a) => counts(a).every((x, i) => x >= need[i]));
}
