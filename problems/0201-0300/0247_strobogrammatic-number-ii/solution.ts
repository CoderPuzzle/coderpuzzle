function findStrobogrammatic(n: number): string[] {
    // A strobogrammatic number of length n is one wrapping pair around one
    // of length n - 2, so the recursion shrinks by 2 per level — down to an
    // empty core (even n) or one self-rotating digit (odd n).
    const build = (length: number, outer: boolean): string[] => {
        if (length === 0) return [""];
        if (length === 1) return ["0", "1", "8"];
        // "00" would put a leading zero on the whole number, so it may wrap
        // only inner layers, never the outermost.
        const pairs = outer ? ["11", "69", "88", "96"] : ["00", "11", "69", "88", "96"];
        const inners = build(length - 2, false);
        const results: string[] = [];
        // Pairs ascend by their left digit and every wrapped result has the
        // same length, so each layer emits its list in ascending
        // lexicographic order already — no final sort needed.
        for (const pair of pairs) {
            for (const inner of inners) {
                results.push(pair[0] + inner + pair[1]);
            }
        }
        return results;
    };
    return build(n, true);
}
