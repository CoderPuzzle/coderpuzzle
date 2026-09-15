function wordSquares(words: string[]): string[][] {
    const n = words[0].length;
    // Map every prefix of every word (empty prefix included) to the words
    // sharing it, so each search step is a single lookup.
    const prefixMap = new Map<string, string[]>();
    for (const w of words) {
        for (let i = 0; i <= n; i++) {
            const p = w.slice(0, i);
            if (!prefixMap.has(p)) prefixMap.set(p, []);
            prefixMap.get(p)!.push(w);
        }
    }

    const results: string[][] = [];
    const square: string[] = [];
    const backtrack = function (): void {
        if (square.length === n) {
            results.push(square.slice());
            return;
        }
        const col = square.length;
        // Row `col` must start with the column-`col` chars already placed,
        // so the next word is constrained to one forced prefix.
        let prefix = "";
        for (let r = 0; r < col; r++) prefix += square[r].charAt(col);
        // A matching word fixes square[j][col] == square[col][j] for every
        // earlier row j at once; a missing bucket prunes the branch here.
        const candidates = prefixMap.get(prefix);
        if (candidates === undefined) return;
        for (const w of candidates) {
            square.push(w);
            backtrack();
            square.pop();
        }
    };
    backtrack();
    // Sorting only makes the output order deterministic.
    results.sort(function (a, b): number {
        for (let i = 0; i < n; i++) {
            if (a[i] < b[i]) return -1;
            if (a[i] > b[i]) return 1;
        }
        return 0;
    });
    return results;
}
